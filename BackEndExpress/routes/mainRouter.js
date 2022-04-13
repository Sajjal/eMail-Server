const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const axios = require('axios')
const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(process.env.DISCORD_BOT_KEY);

const { createAccountLimiter, verifyLogin } = require("../modules/verifyLogin");
const { addData, getData, searchData, updateData, removeData, expiredToken } = require("../modules/dbConfig");

/************************** Setup Multer **************************/
const maxSize = 25 * 1024 * 1024; // 25 MB

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "emailAttachments");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const whitelist = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
    "image/svg",
    "image/vnd.adobe.photoshop",
    "audio/mpeg",
    "application/mp4",
    "video/webm",
    "application/pdf",
    "application/zip",
    "application/x-7z-compressed",
    "application/tar.gz",
    "application/x-font-ttf",
    "application/x-font-woff",
    "application/msword",
    "application/vnd.ms-powerpoint",
    "application/vnd.apple.pages",
    "application/vnd.apple.keynote",
    "application/vnd.apple.numbers",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    "application/vnd.openxmlformats-officedocument.presentationml.template",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
];

const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        if (!whitelist.includes(file.mimetype)) return cb(null, false);
        cb(null, true);
    },
});
/*******************************************************************/

//config Email
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", (req, res) => {
    return res.sendFile("index.html", { root: public });
});

router.post("/authorize", verifyLogin, (req, res) => {
    return res.sendStatus(200);
});

router.post("/inbox", upload.any(), async(req, res) => {
    const emailBody = req.body && req.body.html ? req.body.html.toString() : req.body && req.body.text ? req.body.text.toString() : '';
    const message = {
        from: req.body.from,
        sender_ip: req.body.sender_ip,
        to: req.body.to,
        subject: req.body.subject,
        isNew: true,
        message: emailBody,
        date: Date.now(),
        attachments: [],
    };

    req.files.forEach((file) => {
        message.attachments.push({
            name: file.originalname,
            path: file.path,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        });
    });

    // Check if Sender/Receiving-Mailbox is in Block-list 
    if (await checkBlockList(null, { $or: [{ "email": message.from }, { "email": message.to.includes('<') ? message.to.split('<')[1].split('>')[0] : message.to }] })) return res.sendStatus(200);

    await addData("inbox", message);

    //Notify to Discord
    const msgBody = req.body && req.body.text ? req.body.text.toString().substring(0, 900) : 'Unable to read Email Body!'
    try {
        const noticeToDiscordBot = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .addFields({ name: message.subject, value: `From: \t ${message.from} \n To:  \t ${message.to} \n Body: \t ${msgBody}` })
            .setTimestamp()
            .setFooter("Thank You!");
        client.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(noticeToDiscordBot);
    } catch (err) {}


    return res.sendStatus(200);
});

router.post("/login", createAccountLimiter, async(req, res) => {
    const response = await axios.post(`${process.env.ACCESS_URL}`, { service: "emailserver", uuid: req.body.accessCode });
    if (!response.data.status) return res.status(401).json({ Error: "Invalid Access Code" });

    //if (req.body.accessCode != process.env.ACCESS_CODE) return res.status(401).json({ Error: "Invalid Access Code" });
    const accessToken = jwt.sign({ id: "mrsajjal" }, process.env.TOKEN_SECRET, { expiresIn: "3600s" }); //One Hour
    //Save accessToken to Client's Browser Cookie and Redirect to Dashboard
    //return res.cookie("accessToken", accessToken).status(200).json({ Message: "You are Logged In !" });
    return res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict" }).status(200).json({ Message: "You are Logged In !" });
});

router.post("/emails", verifyLogin, async(req, res) => {
    if (!req.body.directory) return res.sendStatus(403);

    let data = [];
    let skip = 0;
    let limit = 10;
    const projection = { message: 0, sender_ip: 0 };
    if (req.body.skip) skip = req.body.skip;
    if (req.body.limit) limit = req.body.limit;

    if (req.body.directory == "Inbox") data = await getData("inbox", projection, skip, limit);
    else if (req.body.directory == "Sent") data = await getData("sent", projection, skip, limit);
    else if (req.body.directory == "Starred") data = await getData("starred", projection, skip, limit);
    else if (req.body.directory == "Trash") data = await getData("trash", projection, skip, limit);
    else if (req.body.directory == "BlockList") data = await getData("blocklist", projection, skip, limit);
    return res.json(data);
});

router.post("/download", verifyLogin, async(req, res) => {
    if (!req.body.name || !req.body.path) return res.sendStatus(403);
    try {
        return res.download(`./${req.body.path}`, req.body.name);
    } catch { return res.sendStatus(403); }
});

router.post("/sent", verifyLogin, upload.any(), async(req, res) => {
    if (!req.body.info) return res.sendStatus(403);
    let data = []
    try { data = JSON.parse(req.body.info) } catch { return res.sendStatus(403) };
    data.sender_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (!data.from && !data.to && !data.subject && !data.message) return res.sendStatus(403);

    data.from = data.from.toString()
    data.to = data.to.toString()
    data.subject = data.subject.toString()
    data.message = data.message.toString()
    data.date = Date.now()
    data.attachments = []

    req.files.forEach((file) => {
        data.attachments.push({
            name: file.originalname,
            path: file.path,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        });
    });

    await addData("sent", data);

    //Send Email
    const htmlEmail = `<br><br><Strong>From:</Strong> ${data.from}<br><br><Strong>To:</Strong> ${data.to}<br><br><Strong>Message: </Strong>${data.message}<br><br>---End of Email---<br>`;
    const info = { to: data.to, from: data.from, subject: data.subject, body: htmlEmail, attachments: data.attachments };
    sendEmail(info);

    return res.sendStatus(200);
});

router.post("/search", verifyLogin, async(req, res) => {
    if (!req.body.directory) return res.sendStatus(403);

    let data = [];
    let skip = 0;
    let limit = 10;
    let count = "yes";
    const projection = { message: 0, sender_ip: 0 };
    if (req.body.skip) skip = req.body.skip;
    if (req.body.limit) limit = req.body.limit;
    if (req.body.searchTerm)
        try {
            data = await searchData(req.body.directory.toLowerCase(), { message: new RegExp(req.body.searchTerm, "i") }, count, projection, skip, limit);
        } catch (err) {}
    else
        try {
            data = await searchData(req.body.directory.toLowerCase(), { _id: req.body.id });
            if (data.data && data.data.length) await updateData(req.body.directory.toLowerCase(), req.body.id, { isNew: false })
        } catch (err) {}
    return res.json(data);
});

router.post("/toTrash", verifyLogin, async(req, res) => {
    if (!req.body.id || !req.body.directory) return res.sendStatus(403);
    const data = await searchData(req.body.directory.toLowerCase(), { _id: req.body.id });

    if (req.body.directory.toLowerCase() == "trash") {
        if (data.data.length && data.data[0].attachments && data.data[0].attachments.length)
            data.data[0].attachments.forEach(file => {
                try { fs.unlinkSync(`./${file.path}`) } catch {}
            });
        await removeData("trash", req.body.id);
    } else {
        await removeData(req.body.directory.toLowerCase(), req.body.id);
        data.data[0].createdAt = new Date();
        await addData("trash", data.data[0]);
    }
    return res.sendStatus(200);
});

router.post("/addStar", verifyLogin, async(req, res) => {
    if (!req.body.id || !req.body.directory) return res.sendStatus(403);
    const ifAlreadyStarred = await searchData('starred', { _id: req.body.id });
    if (ifAlreadyStarred.data && ifAlreadyStarred.data.length) return res.sendStatus(200);
    const data = await searchData(req.body.directory.toLowerCase(), { _id: req.body.id });
    await updateData(req.body.directory.toLowerCase(), req.body.id, { star: true })
    data.data[0].oldDirectory = req.body.directory.toLowerCase()
    data.data[0].star = true
    await addData("starred", data.data[0]);
    return res.sendStatus(200);
});

router.post("/removeStar", verifyLogin, async(req, res) => {
    if (!req.body.id) return res.sendStatus(403);
    const ifAlreadyStarred = await searchData('starred', { _id: req.body.id });
    if (!ifAlreadyStarred.data && !ifAlreadyStarred.data.length) return res.sendStatus(403);
    await updateData(ifAlreadyStarred.data[0].oldDirectory, req.body.id, { star: false })
    await removeData("starred", req.body.id);
    return res.sendStatus(200);
});

router.post("/markAsRead", verifyLogin, async(req, res) => {
    if (!req.body.id || !req.body.directory) return res.sendStatus(403);
    const data = await searchData(req.body.directory.toLowerCase(), { _id: req.body.id });
    await updateData(req.body.directory.toLowerCase(), req.body.id, { isNew: false })
    return res.sendStatus(200);
});

router.post("/block", verifyLogin, async(req, res) => {
    if (!req.body.email && !req.body.type) return res.sendStatus(403);
    if (await checkBlockList(req.body.email)) return res.sendStatus(200);
    await addData("blocklist", { email: req.body.email, type: req.body.type, date: new Date() });
    return res.sendStatus(200);
});

router.post("/unblock", verifyLogin, async(req, res) => {
    if (!req.body.email && !req.body.id) return res.sendStatus(403);
    if (!await checkBlockList(req.body.email)) return res.sendStatus(200);
    await removeData("blocklist", req.body.id);
    return res.sendStatus(200);
});

router.post("/logout", async(req, res) => {
    const token = req.cookies.accessToken;
    if (token) await expiredToken(token);
    return res.cookie("accessToken", "", { maxAge: 1 }).json({ Error: "You are Logged out !" });
});


// Read file to base64
function base64_encode(file) {
    const bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString("base64");
}

//SendGrid Email Sender
async function sendEmail(info) {
    const email = {
        to: info.to,
        from: info.from,
        subject: info.subject,
        text: info.body,
        html: info.body,
        attachments: [],
    };

    info.attachments.forEach(file => {
        email.attachments.push({ filename: file.name, content: base64_encode(`./${file.path}`) })
    });

    try {
        await sgMail.send(email);
    } catch (error) { console.log(error); }
    return;
}


async function checkBlockList(email, multiple = null) {
    if (!email && !multiple) return false
    let isBlocked = {}
    if (!multiple) isBlocked = await searchData('blocklist', { email });
    if (multiple) isBlocked = await searchData('blocklist', multiple);
    if (isBlocked.data && isBlocked.data.length) return true;
    return false
}

module.exports = router;
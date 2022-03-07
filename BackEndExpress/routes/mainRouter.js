const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");

//const Discord = require("discord.js");
//const client = new Discord.Client();
//client.login(process.env.DISCORD_BOT_KEY);

const upload = multer({ limits: { fieldSize: 25 * 1024 * 1024 } });

const { createAccountLimiter, verifyLogin } = require("../modules/verifyLogin");
const { addData, getData, searchData, updateData, removeData, expiredToken } = require("../modules/dbConfig");

//config Email
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", (req, res) => {
    return res.sendFile("index.html", { root: public });
});

router.post("/authorize", verifyLogin, (req, res) => {
    return res.sendStatus(200);
});

router.post("/inbox", upload.none(), async(req, res) => {
    const message = {
        from: req.body.from,
        sender_ip: req.body.sender_ip,
        to: req.body.to,
        subject: req.body.subject,
        isNew: true,
        message: req.body.html.toString(),
        date: Date.now(),
    };
    await addData("inbox", message);

    //Notify to Discord
    /*
    try {
      const noticeToDiscordBot = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .addFields({ name: message.subject, value: `From: \t ${message.from} \n To:  \t ${message.to} \n Body: \t ${req.body.text}` })
        .setTimestamp()
        .setFooter("Thank You!");
      client.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(noticeToDiscordBot);
    } catch (err) {}
    */

    return res.sendStatus(200);
});

router.post("/login", createAccountLimiter, async(req, res) => {
    //const response = await axios.post(`${process.env.ACCESS_URL}`, { service: "emailserver", uuid: req.body.accessCode });
    //if (!response.data.status) return res.status(401).json({ Error: "Invalid Access Code" });

    if (req.body.accessCode != process.env.ACCESS_CODE) return res.status(401).json({ Error: "Invalid Access Code" });
    const accessToken = jwt.sign({ id: "mrsajjal" }, process.env.TOKEN_SECRET, { expiresIn: "3600s" }); //One Hour
    //Save accessToken to Client's Browser Cookie and Redirect to Dashboard
    return res.cookie("accessToken", accessToken).status(200).json({ Message: "You are Logged In !" });
    //return res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict" }).status(200).json({ Message: "You are Logged In !" });
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

    return res.json(data);
});

router.post("/sent", verifyLogin, async(req, res) => {
    const data = req.body;
    data.sender_ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (!data.from && !data.to && !data.subject && !data.message) return res.sendStatus(403);

    data.from = data.from.toString()
    data.to = data.to.toString()
    data.subject = data.subject.toString()
    data.message = data.message.toString()
    data.date = Date.now()
    await addData("sent", data);

    //Send Email
    const htmlEmail = `<br><br><Strong>From:</Strong> ${data.from}<br><br><Strong>To:</Strong> ${data.to}<br><br><Strong>Message: </Strong>${data.message}<br><br>---End of Email---<br>`;
    const info = { to: data.to, from: data.from, subject: data.subject, body: htmlEmail };
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
    if (req.body.directory.toLowerCase() == "trash") await removeData("trash", req.body.id);
    else {
        const data = await searchData(req.body.directory.toLowerCase(), { _id: req.body.id });
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

router.post("/logout", async(req, res) => {
    const token = req.cookies.accessToken;
    if (token) await expiredToken(token);
    return res.cookie("accessToken", "", { maxAge: 1 }).json({ Error: "You are Logged out !" });
});

//SendGrid Email Sender
async function sendEmail(info) {
    const email = {
        to: info.to,
        from: info.from,
        subject: info.subject,
        text: info.body,
        html: info.body,
    };
    try {
        await sgMail.send(email);
    } catch (error) {}
    return;
}

module.exports = router;
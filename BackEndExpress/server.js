const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const dotenv = require("dotenv").config();

//cors = require("cors");
//app.use(cors());

//Import routes
const mainRouter = require("./routes/mainRouter");

//MiddleWares
app.use(express.static("public"));
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use("/", mainRouter);

app.get("*", (req, res) => {
    return res.redirect("/");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    return console.log(`Listening on localhost:${port}`);
});
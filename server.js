const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const { client, connectToMongoDB } = require("./db.js");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const passportConfig = require("./passport/passportConfig");
const loginRouter = require("./routes/login.js");
const idChecker = require("./api/idChecker.js");
const tokenChecker = require("./api/tokenChecker.js");
const getAllWritings = require("./api/getAllWritings.js");
const postWriting = require("./api/postWriting.js");
const getOneWriting = require("./api/getOneWriting.js");
const getMyWriting = require("./api/getMyWriting.js");
const deleteWriting = require("./api/deleteWriting.js");
const editWriting = require("./api/editWriting.js");
const uploadFile = require("./api/uploadFile.js");
const signUp = require("./routes/signUp.js");
const postComment = require("./api/postComment.js");
const getComments = require("./api/getComments.js");
const deleteComment = require("./api/deleteComment.js");
const editComment = require("./api/editComment.js");
const postRecomment = require("./api/postRecomment.js");
const getRecomment = require("./api/getRecomment.js");
const deleteRecomment = require("./api/deleteRecomment.js");
const editRecomment = require("./api/editRecomment.js");
("");

// 토큰은 로그인 시에만 발급한다. 특히, 페이로드에는 아이디 정보가 들어가기 때문에, 발급 시점은 로그인 시점이다.

app.use(
  cors({
    origin: ["http://localhost:3000", "https://tblog-client.vercel.app/"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
passportConfig(passport, client);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", loginRouter);
app.use("/", idChecker);
app.use("/", tokenChecker);
app.use("/", postWriting);
app.use("/", getAllWritings);
app.use("/", getOneWriting);
app.use("/", getMyWriting);
app.use("/", deleteWriting);
app.use("/", editWriting);
app.use("/", signUp);
app.use("/", uploadFile);
app.use("/", postComment);
app.use("/", getComments);
app.use("/", deleteComment);
app.use("/", editComment);
app.use("/", postRecomment);
app.use("/", getRecomment);
app.use("/", deleteRecomment);
app.use("/", editRecomment);

async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port: ${process.env.PORT}!!`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

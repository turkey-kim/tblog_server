const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
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
const signUp = require("./routes/signUp.js");
("");

// 토큰은 로그인 시에만 발급한다. 특히, 페이로드에는 아이디 정보가 들어가기 때문에, 발급 시점은 로그인 시점이다.

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
passportConfig(passport, client);
app.use("/", loginRouter);
app.use("/", idChecker);
app.use("/", tokenChecker);
app.use("/", postWriting);
app.use("/", getAllWritings);
app.use("/", getOneWriting);
app.use("/", getMyWriting);
app.use("/", signUp);

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

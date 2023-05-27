const express = require("express");
require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

router.get("/login", async (req, res) => {
  res.send("hello this is login page!");
});

router.post("/login", async (req, res, next) => {
  try {
    passport.authenticate("local", { failureRedirect: "/" }, (error, user) => {
      if (error || !user) {
        return res.json({ message: "잘못된 회원정보입니다." }); // 오류메시지 보내기
      }
      console.log("로그인 성공");
      const payload = { id: user.id };
      const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
      const profile = {
        id: user.id,
        nickname: user.nickname,
      };
      console.log(token);
      res.json({ token, profile });
    })(req, res, next);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;

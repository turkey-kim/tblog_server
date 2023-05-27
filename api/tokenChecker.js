require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

router.get("/api/check_token", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded) {
      res.json({ tokenValidity: true });
      console.log("인증성공");
    } else {
      res.json({ tokenValidity: false });
      console.log("인증실패");
    }
  } catch (err) {
    res.json({ tokenValidity: false });
    console.log("인증실패");
    console.error(err);
  }
});

module.exports = router;

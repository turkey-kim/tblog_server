const express = require("express");
const router = express.Router();
const { createHashedPassword } = require("../utils/utils");
const { client } = require("../db");

router.post("/sign_up", async (req, res) => {
  // 등록 코드
  const db = client.db("tblog");
  const hashedPassword = await createHashedPassword(req.body.pw);
  await db.collection("login").insertOne({
    id: req.body.id,
    pw: hashedPassword,
    nickname: req.body.nickname,
  });
  res.redirect("/");
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { client } = require("../db.js");

router.post("/api/id_checker", async (req, res) => {
  const db = client.db("tblog");
  const validity = await db.collection("login").findOne({ id: req.body.id });
  if (validity == null) {
    res.json({ duplicate: false });
  } else {
    res.json({ duplicate: true });
  }
});

module.exports = router;

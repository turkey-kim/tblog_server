const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.post("/api/post_comment", async (req, res) => {
  try {
    const db = client.db("tblog");
    await db.collection("comments").insertOne({
      id: req.body.id,
      user: req.body.user,
      content: req.body.content,
      date: req.body.date,
    });

    db.collection("counter").updateOne(
      { name: "게시글개수" },
      { $inc: { total: 1 } }
    );
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

module.exports = router;

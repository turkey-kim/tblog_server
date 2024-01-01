const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.post("/api/post_writing", async (req, res) => {
  try {
    const db = client.db("tblog");
    let result = await db.collection("counter").findOne({ name: "게시글개수" });
    result = parseInt(result.total);

    await db.collection("writings").insertOne({
      id: result + 1,
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
      date: req.body.date,
      auth: req.body.auth,
    });

    await db
      .collection("counter")
      .updateOne({ name: "게시글개수" }, { $inc: { total: 1 } });
    res.status(200).json({ success: true, message: "글 발행완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버에러" });
  }
});

module.exports = router;

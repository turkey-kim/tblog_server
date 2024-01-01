const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.post("/api/edit_writing", async (req, res) => {
  try {
    const db = client.db("tblog");

    await db.collection("writings").updateOne(
      { id: parseInt(req.body.id) },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          date: req.body.date,
        },
      }
    );
    res.status(200).json({ success: true, message: "글 수정완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버에러" });
  }
});

module.exports = router;

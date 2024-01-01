const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.post("/api/delete_writing", async (req, res) => {
  try {
    const db = client.db("tblog");
    await db.collection("writings").deleteOne({ id: req.body.writingId });
    res.status(200).json({ success: true, message: "글 삭제완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버에러" });
  }
});

module.exports = router;

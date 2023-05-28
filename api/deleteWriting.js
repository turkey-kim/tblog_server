const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.post("/api/delete_writing", async (req, res) => {
  try {
    const db = client.db("tblog");
    const myWriting = await db
      .collection("writings")
      .deleteOne({ id: req.body.writingId });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

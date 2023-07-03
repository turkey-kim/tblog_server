const express = require("express");
const router = express.Router();
const { client } = require("../db");
const { ObjectId } = require("mongodb");

router.post("/api/delete_comment", async (req, res) => {
  try {
    const db = client.db("tblog");
    await db
      .collection("comments")
      .deleteOne({ _id: new ObjectId(req.body.commentId) });
    console.log(req.body.commentId);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

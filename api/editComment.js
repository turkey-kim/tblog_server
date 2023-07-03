const express = require("express");
const router = express.Router();
const { client } = require("../db");
const { ObjectId } = require("mongodb");

router.post("/api/edit_comment", async (req, res) => {
  try {
    const db = client.db("tblog");
    await db.collection("comments").updateOne(
      { _id: new ObjectId(req.body.commentId) },
      {
        $set: {
          content: req.body.content,
          date: req.body.date,
        },
      }
    );

    console.log(req.body.id);
    console.log(req.body.content);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

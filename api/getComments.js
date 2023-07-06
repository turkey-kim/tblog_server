const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.post("/api/get_comments", async (req, res) => {
  try {
    const db = client.db("tblog");
    const comments = await db
      .collection("comments")
      .find({ pageNumber: req.body.pageNumber })
      .toArray();
    res.json(comments);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

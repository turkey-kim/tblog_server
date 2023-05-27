const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.post("/api/get_one_writing", async (req, res) => {
  try {
    const db = client.db("tblog");
    const writing = await db
      .collection("writings")
      .findOne({ id: req.body.id });
    res.json(writing);
    console.log(writing);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

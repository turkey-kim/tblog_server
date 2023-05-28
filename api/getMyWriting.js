const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.post("/api/get_my_writing", async (req, res) => {
  try {
    const db = client.db("tblog");
    const myWriting = await db
      .collection("writings")
      .find({ auth: req.body.author })
      .toArray();
    res.json(myWriting);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

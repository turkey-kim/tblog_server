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
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

module.exports = router;

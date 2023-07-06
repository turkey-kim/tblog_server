const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.post("/api/get_recomments", async (req, res) => {
  try {
    const db = client.db("tblog");
    const recomments = await db
      .collection("recomments")
      .find({ pageNumber: req.body.pageNumber })
      .toArray();
    res.json(recomments);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

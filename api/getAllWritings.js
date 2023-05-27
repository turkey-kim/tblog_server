const express = require("express");
const router = express.Router();
const { client } = require("../db");

router.get("/api/get_writings", async (req, res) => {
  try {
    const db = client.db("tblog");
    const allWritings = await db.collection("writings").find().toArray();
    res.json(allWritings);
    console.log("전송완료");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

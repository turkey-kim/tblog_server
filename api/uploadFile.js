const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cd) {
    cd(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/api/uploadFile", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    res.json({ message: "dd" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

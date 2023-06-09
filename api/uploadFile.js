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
    console.log(req.file.path);
    res.json({ imagePath: req.file.path });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;

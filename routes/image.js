const express = require("express");
const router = express.Router();
const path = require("path");
const s3 = require("../modules/multer");

router.post("/upload", s3.upload.single("file"), function (req, res, next) {
  console.log(req.file.location);
  res.json({ status: 200, uri: req.file.location });

  // DB에 해당 location 저장
});

module.exports = router;

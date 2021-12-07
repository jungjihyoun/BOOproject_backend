const express = require("express");
const router = express.Router();
const path = require("path");
let multer = require("multer");
let multerS3 = require("multer-s3");
require("dotenv").config(); // .env 파일에서 환경변수 불러오기
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

let AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "boofinder",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now() + "." + file.originalname.split(".").pop()); // 이름 설정
    },
  }),
  acl: "public-read-write",
});

router.post("/upload", upload.single("file"), function (req, res, next) {
  console.log(req.file.location);
  res.json({ status: 200, uri: req.file.location });

  // DB에 해당 location 저장
});

module.exports = router;

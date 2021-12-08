const express = require("express");
const router = express.Router();
const path = require("path");
const s3 = require("../modules/multer");
const subCharacterController = require("../controllers/subCharacterController");
const recordController = require("../controllers/recordController");

// 부캐 사진 등록
// router.post(
//   "/upload/:user_id",
//   s3.upload.single("file"),
//   subCharacterController.postSubCharacter
// );

// router.post(
//   "/upload/:post_id",
//   s3.upload.single("file"),
//   recordController.postImage
// );

module.exports = router;

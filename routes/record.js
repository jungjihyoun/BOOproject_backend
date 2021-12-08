var express = require("express");
var router = express.Router();

var recordController = require("../controllers/recordController");

// [record]  글 쓰기
router.post("/post/:user_id/:subcharacter_id", recordController.postRecord);

// 글 삭제
router.delete("/post/:user_id/:post_id", recordController.deleteRecord);

// [record]  다른 유저 글 불러오기
router.get("/other/:user_id", recordController.getOthersRecord);

// 좋아요
router.post("/likes/:user_id/:post_id", recordController.postRecordLike);

module.exports = router;

var express = require("express");
var router = express.Router();
var registerEmail = require("../register/emailRegister");
const authController = require("../controllers/authController");

// 인증 이메일 보내기
router.post("/emailAuth", authController.postEmail);
// 이메일 중복 체크
router.post("/checkEmail", authController.checkEmail);

// [record] 이메일, 인증코드 , 유저 프로필 디비에 저장
router.post("/setUser", authController.setUser);

// 로그인 , 로그아웃. userID 코드를 return
router.post("/login/:email/:password", authController.login);

module.exports = router;

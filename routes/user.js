var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

// ******************

// 유저 정보 불러오기
router.get("/get/:user_id", userController.getUser);
module.exports = router;

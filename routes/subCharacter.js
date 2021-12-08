var express = require("express");
var router = express.Router();
var subCharacterController = require("../controllers/subCharacterController");

// 해당 유저의 부캐릭터 정보 불러오기
router.get("/:user_id", subCharacterController.getSubcharacter);

// [record] 부캐릭터 쓰기
router.post("/record/:user_id", subCharacterController.postSubCharacter);

// 부캐릭터 삭제
router.delete(
  "/post/:user_id/:subcharacter_id",
  subCharacterController.deleteSubCharacter
);
// [get]  다른 부캐 불러오기
router.get("/otherboo/:user_id", subCharacterController.getOtherSubcharacter);

router.get("/likes/:user_id", subCharacterController.getLike);
// 좋아요
router.post(
  "/likes/:user_id/:subcharacter_id",
  subCharacterController.postSubCharacterLike
);

module.exports = router;

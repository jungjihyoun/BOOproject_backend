var express = require("express");
var router = express.Router();
var subCharacterController = require("../controllers/subCharacterController");
const s3 = require("../modules/multer");

router.get("/:user_id", subCharacterController.getSubcharacter);
router.post(
  "/record/:user_id",
  s3.upload.single("file"),
  subCharacterController.postSubCharacter
);
router.delete(
  "/post/:user_id/:subcharacter_id",
  subCharacterController.deleteSubCharacter
);
router.get("/otherboo/:user_id", subCharacterController.getOtherSubcharacter);
router.get("/likes/:user_id", subCharacterController.getLike);
router.post(
  "/likes/:user_id/:subcharacter_id",
  subCharacterController.postSubCharacterLike
);

module.exports = router;

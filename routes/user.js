var express = require("express");
var router = express.Router();
const maria = require("../database/connect/maria");

// ******************

// 유저 정보 불러오기
router.get("/get/:user_id", function (req, res, next) {
  maria.query(
    `select * from user user_id = '${req.params.user_id}'`,
    function (err, rows, fields) {
      if (!err) {
        console.log(rows);
        console.log(fields);
        var result =
          "rows : " +
          JSON.stringify(rows) +
          "<br><br>" +
          "fields : " +
          JSON.stringify(fields);
        res.send(result);
      } else {
        console.log("query error : " + err);
        res.send(err);
      }
    }
  );
});

module.exports = router;

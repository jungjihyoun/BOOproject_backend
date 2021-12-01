var express = require("express");
var router = express.Router();
const maria = require("../database/connect/maria");

// ******************

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/users", function (req, res, next) {
  maria.query("select * from user", function (err, rows, fields) {
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
  });
});

router.get("/subcharacter/:user_id", function (req, res, next) {
  let subcharacterID = req.body.subcharacterID;

  maria.query(
    `select * from subcharacter where user_id = '${req.params.user_id}' `,
    function (err, rows, fields) {
      if (!err) {
        console.log(rows);

        res.send(rows);
      } else {
        console.log("query error : " + err);
        res.send(err);
      }
    }
  );
});

// [record] 부캐릭터 저장
router.post("/setSubcharacter/:user_id", function (req, res, next) {
  console.log(
    req.params.user_id,
    // req.body.subcharacter_id,
    req.body.startDate,
    req.body.title,
    req.body.subtitle,
    req.body.goal,
    req.body.img_path
  );
  maria.query(
    `INSERT INTO subcharacter(user_id,  startDate, title, subtitle , goal) VALUES  ("${req.params.user_id}","${req.body.startDate}","${req.body.title}","${req.body.subtitle}","${req.body.goal}")`,

    function (err, rows, fields) {
      if (err) {
        console.log("post Subcharacter fail", err);
      } else {
        console.log("post Subcharacter success");
      }
    }
  );
});

// [record]  글 쓰기
router.post("/record/:user_id/:subcharacter_id", function (req, res, next) {
  console.log(
    req.params.subcharacter_id,
    req.params.user_id,
    req.body.content,
    req.body.feeling,
    req.body.secret
  );
  maria.query(
    `INSERT INTO post(user_id,  subcharacter_id, content, feeling , secret) VALUES  ("${req.params.user_id}","${req.params.subcharacter_id}","${req.body.content}","${req.body.feeling}","${req.body.secret}")`,

    function (err, rows, fields) {
      if (err) {
        console.log("post record fail", err);
      } else {
        console.log("post record success");
      }
    }
  );
});

// [get]  다른 부캐 불러오기
router.get("/get/otherboo/:user_id", function (req, res, next) {
  console.log("???", req.params.user_id);
  maria.query(
    `select * from subcharacter where user_id not in ('${req.params.user_id}') `,
    function (err, rows, fields) {
      if (!err) {
        console.log("test;;;;;", err, rows);
        // res.send(rows);
      } else {
        console.log("query error : " + err);
        // res.send(err);
      }
    }
  );
});

module.exports = router;

var express = require("express");
var router = express.Router();

// requiree maria.js
const maria = require("../database/connect/maria");

// ******************
const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "jihyoun0602@gmail.com",
    pass: "wlgus8402@",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.post("/emailAuth", async (req, res) => {
  const mailOptions = {
    from: "jihyoun0602@gmail.com",
    to: "jihyoun0602@naver.com",
    subject: "인증받기",
    text: "메일 내용 테스트 ! ",
  };

  await smtpTransport.sendMail(mailOptions, (error, responses) => {
    if (error) {
      res.json({ test: error });
    } else {
      res.json({ msg: "sucess" });
    }
    smtpTransport.close();
  });
});
// ********
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

router.get("/post", function (req, res, next) {
  maria.query("select * from post", function (err, rows, fields) {
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

router.post("/write/user", function (req, res, next) {
  maria.query(
    "INSERT INTO user (user_id,password,username,birthday,email) VALUES('tester02','tester~','tester','1998-06-02','tester@gmail.com')",
    function (err, rows, fields) {
      if (!err) {
        console.log(result);
      } else {
        console.log("query error : " + err);
        res.send(err);
      }
    }
  );
});

module.exports = router;

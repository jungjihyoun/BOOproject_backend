var express = require("express");
var router = express.Router();
var registerEmail = require("../register/emailRegister");

const ejs = require("ejs");
const crypto = require("crypto");

const maria = require("../database/connect/maria");
const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: registerEmail.email,
    pass: registerEmail.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// 인증 이메일 보내기
router.post("/emailAuth", async (req, res) => {
  let code = crypto.randomBytes(3).toString("hex");

  // TODO : 랜덤한 값이지만 DB id 와 비교하고 겹치는 게 있는지 확인

  let emailTemplate;
  ejs.renderFile(
    "/Users/jeongjihyoun/Desktop/booProject/boo_backend/register/register.ejs", //ejs파일 위치
    { email: req.body.userEmail, code: code },
    (err, data) => {
      if (err) {
        console.log(err);
      }
      emailTemplate = data;
    }
  );

  const mailOptions = {
    from: "jihyoun0602@gmail.com",
    to: "jihyoun0602@naver.com",
    subject: "BooFinder 회원가입 인증메일 입니다.",
    html: emailTemplate,
  };

  await smtpTransport.sendMail(mailOptions, (error, responses) => {
    if (error) {
      res.json({ fail: error });
    } else {
      res.send(code);
      res.json({ msg: "sucess" });
    }
    smtpTransport.close();
  });
});

// 이메일 중복 체크
router.post("/checkEmail", function (req, res) {
  let userEmail = req.body.userEmail;
  console.log(req.body.userEmail);

  let sql = `select email from user where email = '${userEmail}'`;
  maria.query(sql, function (err, rows, fields) {
    let checkEmail = new Object();
    checkEmail.tf = false;

    // rows에 해당 값 있으면 같은 메일이 있으므로 false 반환
    if (rows[0] !== undefined) {
      console.log("중복 있음");
      checkEmail.tf = false;
      res.send(checkEmail);
    } else {
      // 중복 없음
      console.log("중복 없음");
      checkEmail.tf = true;
      res.send(checkEmail);
    }
  });
});

// [register] 이메일 인증 코드 확인
router.post("/checkCode", function (req, res, next) {
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

// [record] 이메일, 인증코드 , 유저 프로필 디비에 저장
router.post("/setUser", function (req, res, next) {
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

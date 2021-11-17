var express = require("express");
var router = express.Router();

// requiree maria.js
const maria = require("../database/connect/maria");

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

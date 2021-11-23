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

module.exports = router;

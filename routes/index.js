var express = require("express");
var router = express.Router();

// requiree maria.js
const maria = require("../database/connect/maria");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test", function (req, res, next) {
  maria.query("select * from t_product", function (err, rows, fields) {
    if (!err) {
      var result =
        "rows : " + JSON.stringify(rows) + "fields : " + JSON.stringify(fields);
      res.send(rows);
    } else {
      console.log("query error : " + err);
      res.json(err);
    }
  });
});
module.exports = router;

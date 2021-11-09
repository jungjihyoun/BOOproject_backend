var express = require("express");
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/test", function (req, res, next) {
  maria.query("select * from t_product", function (err, rows, fields) {
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

module.exports = router;

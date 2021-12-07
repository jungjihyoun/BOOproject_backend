var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
const auth = require("./routes/auth");
app.use("/auth", auth);

const user = require("./routes/user");
app.use("/user", user);

const record = require("./routes/record");
app.use("/record", record);

const subCharacter = require("./routes/subCharacter");
app.use("/subCharacter", subCharacter);

const image = require("./routes/image");
app.use("/image", image);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(
  session({
    secret: "@wlgus8402",
    resave: false,
    saveUninitialized: true,
  })
);

// mariaDB connect
const maria = require("./database/connect/maria");
maria.connect();

module.exports = app;

var express = require("express");
const passport = require("passport");
require("./passport");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var mongoose = require("mongoose");

var mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@blog-data.tvqaz.mongodb.net/Blog-data?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.get("*", (req, res) => {
  res.sendFile(path.join("client/build", "index.html"));
});

///app.use(express.static(path.resolve(__dirname, "../client/build")));
//Passport middleware
app.use(passport.initialize());

const indexRouter = require("./routes/index");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");

app.use("/blog", indexRouter);
//Authentication
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;

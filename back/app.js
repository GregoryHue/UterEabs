var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


const mysql_connection = require("./plugins/mysql");
const mongo_connection = require("./plugins/mongo");

var usersRouter = require("./routes/users");
var accountRouter = require("./routes/account");
var articlesRouter = require("./routes/articles");
var menusRouter = require("./routes/menus");
var ordersRouter = require("./routes/orders");


var indexRouter = require("./routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/users", usersRouter);
app.use("/account", accountRouter);
app.use("/articles", articlesRouter);
app.use("/menus", menusRouter);
app.use("/orders", ordersRouter);

module.exports = app;

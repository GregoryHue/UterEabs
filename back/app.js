var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors')
require("dotenv").config();


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


app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.CROSS_ALLOWED);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


module.exports = app;

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser')
var logger = require("morgan");
var cors = require("cors");

const mysql_connection = require("./plugins/mysql");
const mongo_connection = require("./plugins/mongo");

var usersRouter = require("./routes/users");
var accountRouter = require("./routes/account");
var articlesRouter = require("./routes/articles");
var menusRouter = require("./routes/menus");
var ordersRouter = require("./routes/orders");
var indexRouter = require("./routes/index");
var wakeupRouter = require("./routes/wakeup");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/account", accountRouter);
app.use("/articles", articlesRouter);
app.use("/menus", menusRouter);
app.use("/orders", ordersRouter);
app.use("/wakeup", wakeupRouter);

module.exports = app;

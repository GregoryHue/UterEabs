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

app.use(cors({
    origin: 'https://adoring-edison-1d0990.netlify.app',
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options('*', cors())

app.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://adoring-edison-1d0990.netlify.app");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
});


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/account", accountRouter);
app.use("/articles", articlesRouter);
app.use("/menus", menusRouter);
app.use("/orders", ordersRouter);




module.exports = app;

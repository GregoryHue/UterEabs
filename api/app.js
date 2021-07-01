var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var homeRouter = require('./routes/home');
var articlesRouter = require('./routes/articles');
var menusRouter = require('./routes/menus');
var ordersRouter = require('./routes/orders');
var deliveriesRouter = require('./routes/deliveries');
var statsRouter = require('./routes/stats');
var shareRouter = require('./routes/share');

var app = express();


mongoose.connect(process.env.DB_MONGO,
    {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB connected !'))
    .catch((err) => console.log('MongoDB error !', err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);
app.use('/home', homeRouter);
app.use('/articles', articlesRouter);
app.use('/menus', menusRouter);
app.use('/orders', ordersRouter);
app.use('/deliveries', deliveriesRouter);
app.use('/stats', statsRouter);
app.use('/share', shareRouter);

module.exports = app;

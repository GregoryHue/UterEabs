var express = require('express');
var mysql = require('mysql')
var ObjectId = require('mongodb').ObjectID;
const Order = require('../models/order');
const Menu = require('../models/menu');
const Article = require('../models/article');
var cors = require('cors')
require('dotenv').config()


var router = express.Router();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  insecureAuth: true
})


connection.connect()

router.use(cors())


router.post('/get/users', (req, res, next) => {
  console.log(req.body)

  connection.query(`SELECT * FROM users where id in (?, ?, ?)`, [req.body.client_id, req.body.owner_id, req.body.delivery_id], function (err, user_data) {
    if (err) {
      console.log(err)
      res.status(400)
        .json({
          message: 'Error 2 :' + err,
          user: ''
        })
    } else {
      res.status(200)
        .json({
          message: 'User found',
          user: user_data
        })
    }
  })
});


router.post('/get/users/single', (req, res, next) => {
  console.log(req.body)

  Order.find({ _id: req.body._id }).then(function (orders) {

    connection.query(`SELECT * FROM users where id in (?, ?, ?)`, [orders[0].client_id, orders[0].owner_id, orders[0].delivery_id], function (err, user_data) {
      if (err) {
        console.log(err)
        res.status(400)
          .json({
            message: 'Error 2 :' + err,
            user: ''
          })
      } else {
        res.status(200)
          .json({
            user: user_data,
            order: orders[0]
          })
      }
    })
  })
});

router.post('/get/food', (req, res, next) => {
  console.log(req.body)

  var l_menus = []
  req.body.l_menu.forEach(id => {
    l_menus.push(ObjectId(id))
  });

  var l_articles = []
  req.body.l_article.forEach(id => {
    l_articles.push(ObjectId(id))
  });

  Menu.find({_id: { $in: l_menus }}).then(function (menus) {
    Article.find({_id: { $in: l_articles }}).then(function (articles) {
      res.send({
        menus: menus,
        articles: articles,
      })
    });
  });
});

router.post('/get/current', (req, res, next) => {
  console.log(req.body)

  Order.find({
    $or: [{ owner_id: req.body.owner_id }, { _id: req.body._id }],
    status: { $lt: req.body.status },
  }).then(function (orders) {
    console.log(orders)
    res.send(orders);
  });
});

router.post('/get/history', (req, res, next) => {
  console.log(req.body)

  Order.find({
    $or: [{ owner_id: req.body.owner_id }, { _id: req.body._id }],
    status: { $gt: req.body.status },
  }).then(function (orders) {
    console.log(orders)
    res.send(orders);
  });
});

router.post('/next/status', (req, res, next) => {
  console.log(req.body)
  Order.findByIdAndUpdate({ _id: req.body._id }, req.body, function (error, orders) {
    if (error) return console.log(error);
    if (!orders) return res.status(404).json({ message: 'Order can\'t be found.' });
    res.json({ message: 'Order status modified !' });
  });
});




module.exports = router;

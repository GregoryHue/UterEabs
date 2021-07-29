const mysql_connection = require("../plugins/mysql");
var ObjectId = require("mongodb").ObjectID;
const Order = require("../models/OrderModel");
const Menu = require("../models/MenuModel");
const Article = require("../models/ArticleModel");

const ActorsIDall = (req, res, next) => {
  console.log(req.body);

  mysql_connection.query(`SELECT * FROM users where id in (?, ?, ?)`, [req.body.client_id, req.body.owner_id, req.body.delivery_id],
    function (err, user_data) {
      if (err) {
        console.log(err);
        res.status(400).json({
          message: "Error 2 :" + err,
          user: "",
        });
      } else {
        res.status(200).json({
          user: user_data,
        });
      }
    }
  );
};

const ActorsIDsingle = (req, res, next) => {
  console.log(req.body);

  Order.find({ _id: req.body._id }).then(function (orders) {
    mysql_connection.query(
      `SELECT * FROM users where id in (?, ?, ?)`,
      [orders[0].client_id, orders[0].owner_id, orders[0].delivery_id],
      function (err, user_data) {
        if (err) {
          console.log(err);
          res.status(400).json({
            message: "Error 2 :" + err,
            user: "",
          });
        } else {
          res.status(200).json({
            user: user_data,
            order: orders[0],
          });
        }
      }
    );
  });
};

const OrderContent = (req, res, next) => {
  console.log(req.body);

  var l_menus = [];
  req.body.l_menu.forEach((id) => {
    l_menus.push(ObjectId(id));
  });

  var l_articles = [];
  req.body.l_article.forEach((id) => {
    l_articles.push(ObjectId(id));
  });

  Menu.find({ _id: { $in: l_menus } }).then(function (menus) {
    Article.find({ _id: { $in: l_articles } }).then(function (articles) {
      res.send({
        menus: menus,
        articles: articles,
      });
    });
  });
};

const CurrentOrders = (req, res, next) => {
  console.log(req.body);

  Order.find({
    $or: [{ owner_id: req.body.owner_id }, { _id: req.body._id }],
    status: { $lt: req.body.status },
  }).then(function (orders) {
    console.log(orders);
    res.send(orders);
  });
};

const HistoryOrders = (req, res, next) => {
  console.log(req.body);

  Order.find({
    $or: [{ owner_id: req.body.owner_id }, { _id: req.body._id }],
    status: { $gt: req.body.status },
  }).then(function (orders) {
    console.log(orders);
    res.send(orders);
  });
};

const GoToNextStatus = (req, res, next) => {
  console.log(req.body);

  Order.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    function (error, orders) {
      if (error) return console.log(error);
      if (!orders)
        return res.status(404).json({ message: "Order can't be found." });
      res.json({ message: "Order status modified !" });
    }
  );
};

module.exports = {
  ActorsIDall,
  ActorsIDsingle,
  OrderContent,
  HistoryOrders,
  CurrentOrders,
  GoToNextStatus,
};

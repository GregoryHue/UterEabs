require("dotenv").config();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const mysql_connection = require("../plugins/mysql");
const Menu = require("../models/MenuModel");
const Article = require("../models/ArticleModel");

const GetAllRestaurants = (req, res, next) => {
    console.log(req.body);

    var sql_request = `SELECT * from users WHERE role = 2`;

    mysql_connection.query(sql_request, function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).json({
                message: "Error :" + err,
            });
        } else {
            console.log(data)
            res.status(200).json({
                message: data,
            });
        }
    });
}

const GetFoodRestaurant = (req, res, next) => {
    var article_products, menu_products

    console.log(req.body);

    Article.find({ owner_id: req.body.owner_id,
    }).then(function (articles) {
        console.log(articles);
        article_products = articles
    });

    Menu.find({ owner_id: req.body.owner_id,
    }).then(function (menus) {
        console.log(menus);
        menu_products = menus
    });
    
    res.send({
        article_products: article_products, 
        menu_products: menu_products
    })
};
  

module.exports = {
    GetAllRestaurants,
    GetFoodRestaurant
};

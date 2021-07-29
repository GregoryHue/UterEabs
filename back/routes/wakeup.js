var express = require("express");
const mysql_connection = require("../plugins/mysql");
const Article = require("../models/ArticleModel");

var router = express.Router();

// Dummy request to wake up both databases

router.post("/", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  var sql = `SELECT id FROM users WHERE id = ?;`;
  mysql_connection.query(sql, [req.body.message], function (err, void1) {
    if (err) {
      console.log("Wake up called failed");
      res.json({ message: "Error 1:" + err }).status(400);
    } else {
      Article.find({ message: req.body.message }).then(function (void2) {
        console.log("Wake up called done");
        res.json({ message: "Wake up called done" }).status(200);
      });
    }
  });
});

module.exports = router;

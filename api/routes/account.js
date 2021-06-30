var express = require('express');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var mysql = require('mysql')
var cors = require('cors')
require('dotenv').config()

var router = express.Router();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  insecureAuth: true
})

connection.connect()

router.use(cors())

router.post('/modify', function (req, res, next) {
  console.log(req.body)
  var sql = `UPDATE users SET username = ?, password = ?, town = ?, street = ?, zip_code = ? WHERE id = ?;`;
  connection.query(sql, [req.body.username, req.body.password, req.body.town, req.body.street, req.body.zip_code, req.body.id,], function (err, data) {
    if (err) {
      console.log(err)
      res.json({
        user: '',
        message: 'Error 1:' + err,
      }).status(400)
    } else {
      connection.query(`SELECT * FROM users WHERE id = ?`, [req.body.id], function (err, user_data) {
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
              message: 'User modified',
              user: user_data[0]
            })
        }
      })
    }
  });
});

router.post('/delete', function (req, res, next) {

  console.log(req.body)
  var sql = `DELETE FROM users WHERE id = ?;`;
  connection.query(sql, [req.body.id], function (err, data) {
    if (err) {
      console.log(err)
      res.json({
        message: 'Error 1:' + err,
      }).status(400)
    } else {
      res.json({
        message: 'User deleted, logging out',
      }).status(200)
    }
  });
});

module.exports = router;
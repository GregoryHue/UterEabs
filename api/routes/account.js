var express = require('express');
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


const token_secret = process.env.SECRET_JWT;

connection.connect()

router.use(cors())

router.post('/signup', function (req, res, next) {
  console.log(req.body)
  var role_id = "";
  var sql = `INSERT INTO users (email, username, password, role, town, street, zip_code)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;

  if (req.body.role == 'Client') {
    role_id = 1;
  } else if (req.body.role == 'Restaurant') {
    role_id = 2;
  } else if (req.body.role == 'Dev') {
    role_id = 3;
  } else if (req.body.role == 'Delivery man') {
    role_id = 4;
  }
  connection.query(sql, [req.body.email, req.body.username, req.body.password, role_id, user_token, req.body.town, req.body.street, req.body.zip_code], function (err, data) {
    if (err) {
      console.log(err)
      res.json({
        message: 'Error :' + err,
      }).status(400)
    } else {
      res.json({
        message: 'User added, try to log in now',
      }).status(200)
    }
  });
});


module.exports = router;

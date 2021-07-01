var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var mysql = require('mysql');
var cors = require('cors');
require('dotenv').config()

var router = express.Router();

router.use(cors())

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  insecureAuth: true
})

const token_secret = process.env.SECRET_JWT;

connection.connect()

router.post('/login', function (req, res, next) {
  console.log(req.body)

  connection.query(`SELECT * from users WHERE email = ?`, [req.body.email], function (err, user_data) {
    bcrypt.compare(req.body.password, user_data[0].password).then((valid) => {
      if (!valid) {
        return res.status(401).json({
          message: 'Hash and password are differents',
          token: '',
          user: ''
        });
      }
      if (err) {
        console.log(err)
        res.status(400)
          .json({
            message: 'Error 1 :' + err,
            token: '',
            user: ''
          })
      } else {
        if (user_data[0]) {
          var user_token = jwt.sign({ data: req.body.username }, token_secret, { expiresIn: process.env.TOKEN_TIME });
          connection.query(`UPDATE users SET token = ? WHERE email = ?`, [user_token, req.body.email], function (err, data) {
            if (err) {
              console.log(err)
              res.status(400)
                .json({
                  message: 'Error 2 :' + err,
                  token: '',
                  user: ''
                })
            } else {
              res.status(200)
                .json({
                  message: 'User logged in',
                  token: user_token,
                  user: user_data[0]
                })
            }
          })
        } else {
          res.status(500)
            .json({
              message: 'Error 3',
              token: '',
              user: ''
            })
        }
      }
    }).catch(
      (error) => {
        console.log(error)
        res.status(500).json({
          message: 'Error 4' + error,
          token: '',
          user: ''
        });
      }
    );
  });
});

router.post('/signup', function (req, res, next) {
  bcrypt.hash(req.body.password, 10).then(
    (hash) => {
      console.log(req.body)

      var role_id = "";
      var sql = `INSERT INTO users (email, username, password, role, town, street, zip_code)
                VALUES(?, ?, ?, ?, ?, ?, ?)`;

      if (req.body.role == 'Client') {
        role_id = 1;
      } else if (req.body.role == 'Restaurant') {
        role_id = 2;
      } else if (req.body.role == 'Dev') {
        role_id = 3;
      } else if (req.body.role == 'Delivery man') {
        role_id = 4;
      }
      connection.query(sql, [req.body.email, req.body.username, hash, role_id, req.body.town, req.body.street, req.body.zip_code], function (err, data) {
        if (err) {
          console.log(err)
          res.status(400)
            .json({
              message: 'Error :' + err,
            })
        } else {
          res.status(200)
            .json({
              message: 'User added, try to log in now',
            })
        }
      });
    })
});

module.exports = router;

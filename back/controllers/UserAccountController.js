require("dotenv").config();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const mysql_connection = require("../plugins/mysql");

const UserLogin = (req, res, next) => {

  console.log(req.body);

  mysql_connection.query(
    `SELECT * from users WHERE email = ?`,
    [req.body.email],
    function (err, user_data) {
      if (err) return res.status(401);
      bcrypt
        .compare(req.body.password, user_data[0].password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "Hash and password are differents",
              token: "",
              user: "",
            });
          }
          if (err) {
            console.log(err);
            res.status(400).json({
              message: "Error 1 :" + err,
              token: "",
              user: "",
            });
          } else {
            if (user_data[0]) {
              var user_token = jwt.sign(
                { data: req.body.username },
                process.env.SECRET_JWT,
                { expiresIn: process.env.TOKEN_TIME }
              );
              mysql_connection.query(
                `UPDATE users SET token = ? WHERE email = ?`,
                [user_token, req.body.email],
                function (err, data) {
                  if (err) {
                    console.log(err);
                    res.status(400).json({
                      message: "Error 2 :" + err,
                      token: "",
                      user: "",
                    });
                  } else {
                    res.status(200).json({
                      message: "User logged in",
                      token: user_token,
                      user: user_data[0],
                    });
                  }
                }
              );
            } else {
              res.status(500).json({
                message: "Error 3",
                token: "",
                user: "",
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: "Error 4" + error,
            token: "",
            user: "",
          });
        });
    }
  );
};

const UserSignUp = (req, res, next) => {

  bcrypt.hash(req.body.password, 10).then((hash) => {
    console.log(req.body);

    var role_id = "";
    var sql = `INSERT INTO users (email, username, password, role, town, street, zip_code)
                VALUES(?, ?, ?, ?, ?, ?, ?)`;

    if (req.body.role == "Client") {
      role_id = 1;
    } else if (req.body.role == "Restaurant") {
      role_id = 2;
    } else if (req.body.role == "Dev") {
      role_id = 3;
    } else if (req.body.role == "Delivery man") {
      role_id = 4;
    }
    mysql_connection.query(
      sql,
      [
        req.body.email,
        req.body.username,
        hash,
        role_id,
        req.body.town,
        req.body.street,
        req.body.zip_code,
      ],
      function (err, data) {
        if (err) {
          console.log(err);
          res.status(400).json({
            message: "Error :" + err,
          });
        } else {
          res.status(200).json({
            message: "User added, try to log in now",
          });
        }
      }
    );
  });
};

const UserModify = (req, res, next) => {

  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    var sql = `UPDATE users SET username = ?, password = ?, town = ?, street = ?, zip_code = ? WHERE id = ?;`;
    connection.query(
      sql,
      [
        req.body.username,
        hash,
        req.body.town,
        req.body.street,
        req.body.zip_code,
        req.body.id,
      ],
      function (err, data) {
        if (err) {
          console.log(err);
          res
            .json({
              user: "",
              message: "Error 1:" + err,
            })
            .status(400);
        } else {
          connection.query(
            `SELECT * FROM users WHERE id = ?`,
            [req.body.id],
            function (err, user_data) {
              if (err) {
                console.log(err);
                res.status(400).json({
                  message: "Error 2 :" + err,
                  user: "",
                });
              } else {
                res.status(200).json({
                  message: "User modified",
                  user: user_data[0],
                });
              }
            }
          );
        }
      }
    );
  });
};

const UserDelete = (req, res, next) => {

  console.log(req.body);
  var sql = `DELETE FROM users WHERE id = ?;`;
  mysql_connection.query(sql, [req.body.id], function (err, data) {
    if (err) {
      console.log(err);
      res
        .json({
          message: "Error 1:" + err,
        })
        .status(400);
    } else {
      res
        .json({
          message: "User deleted, logging out",
        })
        .status(200);
    }
  });
};

module.exports = { UserLogin, UserSignUp, UserModify, UserDelete };

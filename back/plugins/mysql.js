var mysql = require("mysql2");
require("dotenv").config();

var mysql_connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  insecureAuth: process.env.MYSQL_INSECURE_AUTH,
});

mysql_connection.connect((error) => {
  if (error) {
    console.log("MySQL error !", error);
  } else {
    console.log("MySQL connected !");
  }
});

module.exports = mysql_connection;

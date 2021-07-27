var mysql = require("mysql2");
require("dotenv").config();

var mysql_connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  insecureAuth: process.env.INSECURE_AUTH,
});

mysql_connection.connect((error) => {
  if (error) {
    console.log("MySQL error !", error);
  } else {
    console.log("MySQL connected !");
  }
});

module.exports = mysql_connection;

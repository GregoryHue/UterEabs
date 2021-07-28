var mongoose = require("mongoose");
require("dotenv").config();

var mongo_connection = mongoose
  .connect(process.env.MONGO_CONNECTION, {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected !"))
  .catch((err) => console.log("MongoDB error !", err));

module.exports = mongo_connection;

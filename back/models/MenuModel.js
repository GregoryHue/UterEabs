const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  img: { type: String, required: true },
  l_article: [{ type: String, required: true }],
  menu_name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: false },
  owner_id: { type: Number, required: true },
});

module.exports = mongoose.model("Menu", menuSchema);

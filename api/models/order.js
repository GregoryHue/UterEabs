const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  client_id: { type: Number, required: true },
  owner_id: { type: Number, required: true },
  delivery_id: { type: Number, required: true },
  l_article: [{ type: String, required: true }],
  l_menu: [{ type: String, required: true }],
  description: { type: String, required: false },
  status : { type: Number, required: true },
  created_at: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  id: { type: Number, required: false },
  img: { type: String, required: true },
  food_name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: false },
  owner_id: { type: Number, required: true },

});

module.exports = mongoose.model('Article', articleSchema);
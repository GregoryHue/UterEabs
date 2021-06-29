const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  id: { type: Number, required: true },
  img: { type: String, required: true },
  food_name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  owner_id: { type: Number, required: true },

});

module.exports = mongoose.model('Article', articleSchema);
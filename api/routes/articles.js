var express = require('express');
var mongoose = require('mongoose');
var express = require('express');
const jwt = require('jsonwebtoken');
const Article = require('../models/article');
var cors = require('cors')
require('dotenv').config()

mongoose.connect(process.env.DB_MONGO,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected !'))
  .catch(() => console.log('MongoDB error !'));

var router = express.Router();

router.post('/see', (req, res, next) => {
  console.log(req.body)
  delete req.body._id;
  const article = new Article({
    ...req.body
  });
  article.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;

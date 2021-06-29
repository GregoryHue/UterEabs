var express = require('express');
var express = require('express');
const jwt = require('jsonwebtoken');
const Article = require('../models/article');
var cors = require('cors')
require('dotenv').config()


var router = express.Router();

router.use(cors())

router.post('/see', (req, res, next) => {
  console.log(req.body)

  Article.find({
    $or: [{ owner_id: req.body.owner_id }, { _id: req.body._id },]
  }).then(function (articles) {
    res.send(articles);
  });
});

router.post('/delete', (req, res, next) => {
  console.log(req.body)
  Article.deleteOne({ _id: req.body._id }).then(function (articles) {
    res.json({ message: '' + req.body.food_name + ' deleted' })
  });
});

router.post('/create', (req, res, next) => {
  console.log(req.body)
  delete req.body._id;
  const article = new Article({
    ...req.body
  });
  article.save()
    .then(() => res.status(201).json({ message: 'Object created !' }))
    .catch(error => res.status(400).json({ error }));
});

router.post('/modify', (req, res, next) => {
  console.log(req.body)

  Article.findByIdAndUpdate({_id: req.body._id}, req.body, function (error, article) {
    if (error) return console.log(error);
    if (!article) return res.status(404).json({message: 'Article can\'t be found.'});
    res.json({message : 'Object modified !'});
  });


});

module.exports = router;

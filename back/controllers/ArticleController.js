var express = require("express");
const jwt = require("jsonwebtoken");
const Article = require("../models/ArticleModel");

const CreateArticles = (req, res, next) => {
  console.log(req.body);
  delete req.body._id;
  const article = new Article({
    ...req.body,
  });
  article
    .save()
    .then(() => res.status(201).json({ message: "Article created !" }))
    .catch((error) => res.status(400).json({ error }));
};

const GetArticles = (req, res, next) => {
  console.log(req.body);

  Article.find({
    $or: [{ owner_id: req.body.owner_id }, { _id: req.body._id }],
  }).then(function (articles) {
    console.log(articles);
    res.send(articles);
  });
};

const ModifyArticles = (req, res, next) => {
  console.log(req.body);
  Article.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    function (error, article) {
      if (error) return console.log(error);
      if (!article)
        return res.status(404).json({ message: "Article can't be found." });
      res.json({ message: "Article modified !" });
    }
  );
};

const DeleteArticles = (req, res, next) => {
  console.log(req.body);
  Article.deleteOne({ _id: req.body._id }).then(function (articles) {
    res.json({ message: "Article deleted !" });
  });
};

module.exports = {
  CreateArticles,
  GetArticles,
  ModifyArticles,
  DeleteArticles,
};

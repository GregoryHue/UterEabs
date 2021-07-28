var express = require('express');
const ArticleController = require("../controllers/ArticleController");

var router = express.Router();

router.post("/create", ArticleController.CreateArticles);

router.post("/see", ArticleController.GetArticles);

router.post("/modify", ArticleController.ModifyArticles);

router.post("/delete", ArticleController.DeleteArticles);

module.exports = router;

var express = require('express');
var cors = require("cors");
const ArticleController = require("../controllers/ArticleController");

var router = express.Router();

router.use(cors());

router.post("/create", ArticleController.CreateArticles);

router.post("/see", ArticleController.GetArticles);

router.post("/modify", ArticleController.ModifyArticles);

router.post("/delete", ArticleController.DeleteArticles);

module.exports = router;

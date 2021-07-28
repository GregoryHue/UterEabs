var express = require('express');
const MenuController = require("../controllers/MenuController");

var router = express.Router();

router.post('/create',MenuController.CreateMenus);

router.post('/see', MenuController.GetMenus);

router.post('/modify', MenuController.ModifyMenus);

router.post('/delete', MenuController.DeleteMenus);

module.exports = router;

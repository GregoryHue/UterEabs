var express = require('express');
var cors = require('cors')
const MenuController = require("../controllers/MenuController");

var router = express.Router();

router.use(cors())

router.post('/create',MenuController.CreateMenus);

router.post('/see', MenuController.GetMenus);

router.post('/modify', MenuController.ModifyMenus);

router.post('/delete', MenuController.DeleteMenus);

module.exports = router;

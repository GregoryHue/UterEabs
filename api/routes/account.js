var express = require('express');
var cors = require('cors')
const UserController = require('../controllers/UserAccountController');

var router = express.Router();

router.use(cors())

router.post('/modify', UserController.UserModify);

router.post('/delete', UserController.UserDelete);

module.exports = router;
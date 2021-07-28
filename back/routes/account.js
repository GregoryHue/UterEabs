var express = require('express');
const UserController = require('../controllers/UserAccountController');

var router = express.Router();

router.post('/modify', UserController.UserModify);

router.post('/delete', UserController.UserDelete);

module.exports = router;
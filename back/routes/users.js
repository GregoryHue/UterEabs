var express = require('express');
const UserController = require('../controllers/UserAccountController');

var router = express.Router();

router.post('/login', UserController.UserLogin);

router.post('/signup', UserController.UserSignUp);

module.exports = router;

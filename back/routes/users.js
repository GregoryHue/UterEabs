var express = require('express');
var cors = require('cors');
const UserController = require('../controllers/UserAccountController');

var router = express.Router();

router.use(cors())

router.post('/login', UserController.UserLogin);

router.post('/signup', UserController.UserSignUp);

module.exports = router;

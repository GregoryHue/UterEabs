var express = require('express');
const BuyController = require('../controllers/BuyController');

var router = express.Router();

router.post('/restaurant', BuyController.GetAllRestaurants);

router.post('/food', BuyController.GetFoodRestaurant);


module.exports = router;
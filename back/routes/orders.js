
var express = require("express");
const OrderController = require("../controllers/OrderController");

var router = express.Router();

router.post("/get/actors/all", OrderController.ActorsIDall);

router.post("/get/actors/single", OrderController.ActorsIDsingle);

router.post("/get/food", OrderController.OrderContent);

router.post("/get/current", OrderController.CurrentOrders);

router.post("/get/history", OrderController.HistoryOrders);

router.post("/next/status", OrderController.GoToNextStatus);

module.exports = router;

const express = require("express");
const ordersController = require("../controllers/orders");

const router = express.Router();

router.get("/", ordersController.getOrders);
router.get("/:value", ordersController.getOrder);
router.post("/", ordersController.postOrder);
router.put("/", ordersController.putOrder);
router.delete("/:id", ordersController.deleteOrder);
router.use((request, response) => response.status(404).end());

module.exports = router;

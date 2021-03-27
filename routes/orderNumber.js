const express = require("express");
const dataController = require("../controllers/orderNumber");

const router = express.Router();

router.get("/", dataController.getData);
router.put("/", dataController.putData);
router.use((request, response) => response.status(404).end());

module.exports = router;

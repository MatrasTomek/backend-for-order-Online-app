const express = require("express");
const clientsController = require("../controllers/clients");

const router = express.Router();

router.get("/:vatNo", clientsController.getClient);
router.get("/", clientsController.getClients);
router.post("/", clientsController.postClient);
router.put("/", clientsController.putClient);
router.delete("/:vatNo", clientsController.deleteClient);
router.use((request, response) => response.status(404).end());

module.exports = router;

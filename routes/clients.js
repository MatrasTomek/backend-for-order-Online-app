const express = require("express");
const clientsController = require("../controllers/clients");

const router = express.Router();

router.get("/", clientsController.getClients);
router.get("/:vatNo", clientsController.getClientByVat);
router.get("/name/:companyName", clientsController.getClientByName);
router.post("/", clientsController.postClient);
router.put("/", clientsController.putClient);
router.delete("/:id", clientsController.deleteClient);
router.use((request, response) => response.status(404).end());

module.exports = router;

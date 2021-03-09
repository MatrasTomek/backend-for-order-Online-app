const express = require("express");
const dataController = require("../controllers/data");

const router = express.Router();

// router.get("/", dataController.getData);
// router.post("/", dataController.postData);
// router.put("/", dataController.putData);
// router.delete("/:id", dataController.deleteData);
router.use((request, response) => response.status(404).end());

module.exports = router;

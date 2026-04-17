const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

// Meta webhook verification (GET)
router.get("/", webhookController.verifyWebhook);

// Incoming messages from Meta (POST)
router.post("/", webhookController.receiveMessage);

module.exports = router;

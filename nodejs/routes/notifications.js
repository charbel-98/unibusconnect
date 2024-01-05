//create route for tickets using the same snippets in the close files
// Path: routes/tickets.js
const express = require("express");
const router = express.Router();
const getNotifications = require("../controllers/notifications");
router.get("/", getNotifications);
module.exports = router;

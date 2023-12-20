//create route for tickets using the same snippets in the close files
// Path: routes/tickets.js
const express = require("express");
const router = express.Router();
const getTickets = require("../controllers/tickets");
router.get("/", getTickets);
module.exports = router;

const express = require("express");
const router = express.Router();
const reservation = require("../controllers/reservation");

router.post("/register/:id", reservation);
module.exports = router;

const express = require("express");
const router = express.Router();
const Journey = require("../models/Journey");
const ServiceProvider = require("../models/ServiceProvider");

const { BadRequestError } = require("../errors");
const reservation = require("../controllers/reservation");

router.get("/register/:id", reservation);
module.exports = router;

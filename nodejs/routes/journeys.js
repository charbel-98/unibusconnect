const express = require("express");
const router = express.Router();
const Journey = require("../models/Journey");
const ServiceProvider = require("../models/ServiceProvider");
const { BadRequestError } = require("../errors");
const { journeys, journeyById } = require("../controllers/journeys");
router.get("/", journeys);
router.get("/:id", journeyById);
module.exports = router;

const express = require("express");
const router = express.Router();
const { journeys, journeyById } = require("../controllers/journeys");
router.get("/", journeys);
router.get("/:id", journeyById);
module.exports = router;

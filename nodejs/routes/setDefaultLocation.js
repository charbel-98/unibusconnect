const express = require("express");
const router = express.Router();
const setDefaultLocation = require("../controllers/setDefaultLocation");
// Route to set default location
router.post("/", setDefaultLocation);

module.exports = router;

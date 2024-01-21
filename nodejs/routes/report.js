const express = require("express");
const router = express.Router();
const newReport = require("../controllers/report").newReport;
router.post("/new", newReport);
module.exports = router;

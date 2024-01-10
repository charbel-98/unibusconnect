const router = require("express").Router();
const updateProfile = require("../controllers/changeProfile");
router.post("/", updateProfile);
module.exports = router;

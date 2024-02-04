const router = require("express").Router();
const driverLogin = require("../controllers/driverLogin");
router.get("/", driverLogin);
module.exports = router;

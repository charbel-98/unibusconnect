const router = require("express").Router();
const refreshToken = require("../controllers/refreshToken");
router.get("/", refreshToken);
module.exports = router;

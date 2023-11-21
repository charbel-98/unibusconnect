const router = require("express").Router();
const register = require("../controllers/register");
router.post("/signup", register);
module.exports = router;

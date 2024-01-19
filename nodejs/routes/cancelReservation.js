const router = require("express").Router();
const { cancelReservation } = require("../controllers/cancelReservation");
router.get("/:journeyId", cancelReservation);
module.exports = router;

const Report = require("../models/Report");
const { BadRequestError } = require("../errors");
const sendNotification = require("../utils/sendNotification");
const newReport = async (req, res) => {
  try {
    const { message, type, seat } = req.body;
    if (!message || !type || !seat) {
      throw new BadRequestError("Missing required fields");
    }
    const report = new Report({
      message,
      type,
      seat,
      user: req.user,
    });
    await report.save();
    sendNotification(req, {
      message: `Your ${report.type} report submitted successfully`,
      type: "report",
    });
    res.status(201).json({ message: "Report submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
module.exports = { newReport };

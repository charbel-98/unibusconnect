const Report = require("../models/Report");
const mongoose = require("mongoose");

const newReport = async (req, res) => {
    const { message, type, seat, id } = req.body;
    if (!message || !type || !seat || !id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const check = await Report.findOne({
      journeyID: new mongoose.Types.ObjectId(id),
      user: req.user,
    });
    if (check) return res.status(400).json({ message: "You already reported this journey" });

    const report = new Report({
      journeyID: new mongoose.Types.ObjectId(id),
      message,
      type,
      seat,
      user: req.user,
    });
    await report.save();
    res.status(201).json({ message: `Your ${report.type} report submitted successfully` });
};
module.exports = { newReport };

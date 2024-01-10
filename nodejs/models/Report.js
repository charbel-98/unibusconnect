const mongoose = require("mongoose");
const User = require("./User");
const ReportSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    enum: ["lost-item", "driver-issue"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  seat: {
    type: String,
    default: null,
  },
});

const Report = mongoose.model("Report", ReportSchema);
module.exports = Report;

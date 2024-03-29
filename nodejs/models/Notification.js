const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema({
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
    enum: ["confirmation", "cancelation", "error", "discount", "reminder"],
    required: true,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;

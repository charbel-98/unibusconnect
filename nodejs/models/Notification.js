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
    enum: ["confirmation", "cancellation", "reminder"],
    required: true,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;

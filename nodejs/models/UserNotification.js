const mongoose = require("mongoose");
const UserNotificationSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  notificationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notifications",
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  }
});

const UserNotification = mongoose.model("UserNotification", UserNotificationSchema);
module.exports = UserNotification;

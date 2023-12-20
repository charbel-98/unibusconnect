const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  email: { type: String, trim: true },
  password: { type: String },
  googleId: { type: String },
  avatar: { type: String },
  mobile: { type: String },
  refreshToken: [String],
  defaultLocation: { lat: Number || null, lng: Number || null },
  defaultAddress: { type: String || null },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;

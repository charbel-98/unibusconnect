const mongoose = require("mongoose");
const ServiceProvider = require("./ServiceProvider");
const busSchema = new mongoose.Schema({
  busID: {
    type: String,
    required: true,
    unique: true,
  },
  busnb: {
    type: String,
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  busy: {
    type: Boolean,
    default: false,
  },
  AC: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
    required: true,
  },
  serviceprovider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
  },
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;

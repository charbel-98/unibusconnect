const mongoose = require("mongoose");
const ServiceProvider = require("./ServiceProvider"); // Adjust the path as needed
const User = require("./User"); // Adjust the path as needed
const Bus = require("./Bus"); // Adjust the path as needed
const JourneySchema = new mongoose.Schema({
  serviceProvider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceProvider",
    required: true,
  },
  date: { type: Date, required: true },
  arrivalTimeToUniversity: { type: String, required: true },
  departureTimeFromUniversity: { type: String, required: true },
  bus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus", // Reference to the buses array within ServiceProvider
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  departingPassengers: [
    {
      passenger: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
  ],
  returningPassengers: [
    {
      passenger: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
  ],
});

// ServiceProvider.findOne({ name: "Semaan Tannous" }).then((sp) => {
//   Journey.create({
//     serviceProvider: sp._id,
//     date: new Date("2021-06-26"),
//     departureTime: "10:00",
//     arrivalTime: "12:00",
//     bus: sp.buses[0]._id,
//     AC: false,
//   });
// });

const Journey = mongoose.model("Journey", JourneySchema);

module.exports = Journey;

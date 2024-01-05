const Journey = require("../models/Journey");
const Notification = require("../models/Notification");
const User = require("../models/User");
const UserNotification = require("../models/UserNotification");

async function reservation(req, res) {
  try {
    const journeyID = req.params.id;
    const userId = req.user;
    let globalUserSocketMap = req.app.get("globalUserSocketMap");
    let io = req.app.get("io");
    const socketId = globalUserSocketMap.get(userId);

    const {
      isDeparting,
      userLocation,
      userAddress,
      universityLocation,
      universityAddress,
    } = req.body;
    const journey = await Journey.findById(journeyID).populate("bus");
    //console.log("you want me" + user, journey);
    //check if user already reserved
    if (!journey) {
      socketId &&
        io
          .to(socketId)
          .emit("notification", {
            message: "Journey not found",
            type: "error",
          });
      res.status(404).json({ message: "Journey not found" });
      return;
    }
    if (
      journey.departingPassengers.length == journey.bus.numberOfSeats ||
      journey.returningPassengers.length == journey.bus.numberOfSeats
    ) {
      const buses = await Bus.find({
        serviceprovider: sp._id,
      }).exec();
      if (journey.bus.size !== "large") {
        const large = buses.filter((bus) => bus.size === "large");
        journey.bus = large[0]._id;
      } else {
        //create a new journey with the same date and time
        //and a new bus
        const medium = buses.filter((bus) => bus.size === "medium");
        const newJourney = new Journey({
          serviceProvider: journey.serviceProvider,
          date: journey.date,
          arrivalTimeToUniversity: journey.arrivalTimeToUniversity,
          departureTimeFromUniversity: journey.departureTimeFromUniversity,
          bus: medium[0]._id,
        });
        await newJourney.save();
      }
    }
    if (isDeparting) {
      if (
        journey?.departingPassengers?.some(
          (item) => item.passenger.toString() === userId
        )
      ) {
        socketId &&
          io.to(socketId).emit("notification", {
            message: "You already reserved for this journey",
            type: "error",
          });
        res
          .status(400)
          .json({ message: "You already reserved for this journey" });
        return;
      }
      //reserve
      journey.departingPassengers.push({
        passenger: userId,
        departureLatLng: userLocation,
        departureAddress: userAddress,
        destinationLatLng: universityLocation,
        destinationAddress: universityAddress,
      });
      // journey.save();
    } else {
      if (
        journey?.returningPassengers?.some(
          (item) => item.passenger.toString() === userId
        )
      ) {
        socketId &&
          io.to(socketId).emit("notification", {
            message: "You already reserved for this journey",
            type: "error",
          });
        res
          .status(400)
          .json({ message: "You already reserved for this journey" });
        return;
      }
      journey.returningPassengers.push({
        passenger: userId,
        departureLatLng: universityLocation,
        departureAddress: universityAddress,
        destinationLatLng: userLocation,
        destinationAddress: userAddress,
      });
      // journey.save();
    }
    //change journey status to confirmed if 10 seats were reserved

    if (
      journey.departingPassengers.length == 1 ||
      journey.returningPassengers.length == 1
    ) {
      journey.status = "Confirmed";
      //get the passengers id
      const passengers = journey.departingPassengers.map(
        (item) => item.passenger
      );
      passengers.push(
        ...journey.returningPassengers.map((item) => item.passenger)
      );

      const notification = await Notification.create({
        message: `The journey on ${journey.date} has been confirmed`,
        type: "confirmation",
      });

      console.error("io", io);

      passengers.forEach(async (passenger) => {
        UserNotification.create({
          userID: passenger,
          notificationID: notification._id,
        });
        const socketId = globalUserSocketMap.get(passenger.toString());
        console.log("socketId", socketId);
        console.log("passenger", passenger, passenger.toString());
        if (socketId) {
          io.to(socketId).emit("notification", notification);
        }
      });
    }
    await journey.save();
    const reservationNotification = await Notification.create({
      message: `Your reservation on ${journey.date} with ${journey.serviceProvider.businessName} is successful`,
      type: "confirmation",
    });
    UserNotification.create({
      userID: userId,
      notificationID: reservationNotification._id,
    });
    if (socketId) {
      io.to(socketId).emit("notification", reservationNotification);
    }
    res
      .status(200)
      .json({ message: "Reservation successful", status: journey.status });
  } catch (err) {
    console.log(err);
  }
}

module.exports = reservation;

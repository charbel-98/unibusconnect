const { NotFoundError, BadRequestError } = require("../errors");
const Journey = require("../models/Journey");
const Notification = require("../models/Notification");
const User = require("../models/User");
const UserNotification = require("../models/UserNotification");
const { sendNotification } = require("../utils/sendNotification");

async function reservation(req, res) {
  const journeyID = req.params.id;
  const userId = req.user;

  const {
    isDeparting,
    userLocation,
    userAddress,
    universityLocation,
    universityAddress,
  } = req.body;
  const journey = await Journey.findById(journeyID)
    .populate("bus serviceProvider")
    .exec();
  //console.log("you want me" + user, journey);
  //check if user already reserved
  if (!journey) {
    sendNotification(req, { message: "Journey not found", type: "error" });
    throw new NotFoundError("Journey not found");
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
      sendNotification(req, {
        message: "You already reserved for this journey",
        type: "error",
      });
      throw new BadRequestError("You already reserved for this journey");
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
      sendNotification(req, {
        message: "You already reserved for this journey",
        type: "error",
      });

      throw new BadRequestError("You already reserved for this journey");
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
      message: `The journey on ${
        journey.date.toISOString().split("T")[0]
      } has been confirmed`,
      type: "confirmation",
    });

    setTimeout(() => {
      passengers.forEach(async (passenger) => {
        UserNotification.create({
          userID: passenger,
          notificationID: notification._id,
        });

        sendNotification(req, notification, passenger.toString());
      });
    }, 4000);
  }
  await journey.save();

  sendNotification(req, {
    message: `Your reservation on ${
      journey.date.toISOString().split("T")[0]
    } with ${journey.serviceProvider.businessName} is successful`,
    type: "confirmation",
  });
  res
    .status(200)
    .json({ message: "Reservation successful", status: journey.status });
}

module.exports = reservation;

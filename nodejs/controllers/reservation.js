const Journey = require("../models/Journey");
const User = require("../models/User");
// isDeparting,
// userLocation,
// userAddress,
// universityLocation: university_Lat_Lng,
// universityAddress,
async function reservation(req, res, notify) {
  const journeyID = req.params.id;
  const userId = req.user;
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
    journey.departingPassengers.length == 2 ||
    journey.returningPassengers.length == 2
  ) {
    journey.status = "Confirmed";
    //get the passengers id
    const passengers = journey.departingPassengers.map(
      (item) => item.passenger
    );
    passengers.push(
      ...journey.returningPassengers.map((item) => item.passenger)
    );
    //map through user sockets map and send notification to each user
    const globalUserSocketMap = req.app.get("globalUserSocketMap");
    const notificationMap = req.app.get("notificationMap");
    const io = req.app.get("io");
    const sockets = [];
    passengers.forEach((passenger) => {
      const socketId = globalUserSocketMap.get(passenger);
      if (socketId) {
        sockets.push(socketId);
      } else {
        //store notification in database
      }
    });
    sockets.forEach((socketId) => {
      io.to(socketId).emit("notification", {
        message: `Your reservation on ${journey.date} has been confirmed`,
      });
    });
  }
  await journey.save();

  res
    .status(200)
    .json({ message: "Reservation successful", status: journey.status });
}

module.exports = reservation;

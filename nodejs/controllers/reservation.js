const Journey = require("../models/Journey");
const User = require("../models/User");

async function reservation(req, res) {
  const id = req.params.id;
  const userId = req.user;
  const location = req.body.userLocation;
  const address = req.body.address;
  const isDeparting = req.body.isDeparting;
  const journey = await Journey.findById(id).populate("bus");
  const user = await User.findById(userId);
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
      res.status(400).json({ message: "You already reserved" });
      return;
    }
    //reserve
    journey.departingPassengers.push({ passenger: userId, location, address });
    // journey.save();
  } else {
    if (
      journey?.returningPassengers?.some(
        (item) => item.passenger.toString() === userId
      )
    ) {
      res.status(400).json({ message: "You already reserved" });
      return;
    }
    journey.returningPassengers.push({ passenger: userId, location, address });
    // journey.save();
  }
  //change journey status to confirmed if 10 seats were reserved
  if (
    journey.departingPassengers.length == 2 ||
    journey.returningPassengers.length == 2
  ) {
    journey.status = "Confirmed";
  }
  await journey.save();

  res
    .status(200)
    .json({ message: "Reservation successful", status: journey.status });
}

module.exports = reservation;

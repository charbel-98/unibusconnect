const Journey = require("../models/Journey");
const User = require("../models/User");

async function reservation(req, res) {
  const id = req.params.id;
  const userId = req.user;
  const location = req.body.userLocation;
  const isDeparting = req.body.isDeparting;
  const journey = await Journey.findById(id);
  const user = await User.findById(userId);
  //console.log("you want me" + user, journey);
  //check if user already reserved
  console.log(journey.departingPassengers[0].passenger.toString());
  if (isDeparting) {
    if (
      journey.departingPassengers.some(
        (item) => item.passenger.toString() === userId
      )
    ) {
      res.status(400).json({ message: "You already reserved" });
      return;
    }
    //reserve
    journey.departingPassengers.push({ passenger: userId, location });
    // journey.save();
  } else {
    if (
      journey.returningPassengers.some(
        (item) => item.passenger.toString() === userId
      )
    ) {
      res.status(400).json({ message: "You already reserved" });
      return;
    }
    journey.returningPassengers.push({ passenger: userId, location });
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

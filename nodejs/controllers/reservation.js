const Journey = require("../models/Journey");
const User = require("../models/User");

async function reservation(req, res) {
  const id = req.params.id;
  const userId = req.user;
  const isDeparting = req.body.isDeparting;
  const journey = await Journey.findById(id);
  const user = await User.findById(userId);
  console.log("you want me" + user, journey);
  //check if user already reserved
  console.log(isDeparting);
  if (isDeparting) {
    if (journey.departingPassengers.includes(userId)) {
      res.status(400).json({ message: "You already reserved" });
      return;
    }
    //reserve
    await journey.departingPassengers.push(userId);
    journey.save();
  } else {
    if (journey.returningPassengers.includes(userId)) {
      res.status(400).json({ message: "You already reserved" });
      return;
    }
    await journey.returningPassengers.push(userId);
    journey.save();
  }
  //change journey status to confirmed if 10 seats were reserved
  if (
    journey.departingPassengers.length == 10 ||
    journey.returningPassengers.length == 10
  ) {
    journey.status = true;
    journey.save();
  }
  res
    .status(200)
    .json({ message: "Reservation successful", status: journey.status });
}

module.exports = reservation;

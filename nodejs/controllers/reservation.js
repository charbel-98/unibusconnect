const Journey = require("../models/Journey");
const User = require("../models/User");

async function reservation(req, res) {
  const id = req.params.id;
  const userId = req.user;
  const journey = await Journey.findById(id);
  const user = await User.findById(userId);
  console.log("you want me" + user, journey);
}

module.exports = reservation;

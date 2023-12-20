const Journey = require("../models/Journey");
const getTickets = async (req, res) => {
  const userId = req.user;
  const currentDate = new Date();
  const ticketsData = [];
  if (!userId) res.status(403).json({ message: "forbidden access token" });
  const journeys = await Journey.find({
    $or: [
      { "departingPassengers.passenger": userId },
      { "returningPassengers.passenger": userId },
    ],
    date: { $gte: currentDate },
  }).populate("serviceProvider");
  if (!journeys) res.status(404).json({ message: "no tickets found" });
  for (let journey of journeys) {
    const ticket = {
      journeyId: journey._id,
      date: journey.date,
      status: journey.status,
      isDeparting: false,
      serviceProvider: journey.serviceProvider,
      time: journey.departureTimeFromUniversity,
    };
    if (
      journey.departingPassengers.some(
        (passenger) => passenger.passenger.toString() === userId
      )
    ) {
      ticket.time = journey.arrivalTimeToUniversity;
      ticket.isDeparting = true;
      ticketsData.push(ticket);
    }
    if (
      journey.returningPassengers.some(
        (passenger) => passenger.passenger.toString() === userId
      )
    ) {
      ticketsData.push(ticket);
    }
  }
  res.status(200).json({ tickets: ticketsData });
};
module.exports = getTickets;

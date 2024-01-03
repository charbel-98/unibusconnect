const Journey = require("../models/Journey");
const getTickets = async (req, res) => {
  const userId = req.user;
  const currentDate = new Date();
  const ticketsData = [];
  const history = req.query.history;
  if (!userId) res.status(403).json({ message: "forbidden access token" });
  let journeys;
  if (!history) {
    journeys = await Journey.find({
      $or: [
        { "departingPassengers.passenger": userId },
        { "returningPassengers.passenger": userId },
      ],
      date: { $gte: currentDate },
    }).populate("serviceProvider");
  } else {
    journeys = await Journey.find({
      $or: [
        { "departingPassengers.passenger": userId },
        { "returningPassengers.passenger": userId },
      ],
      status: "Confirmed",
      date: { $lt: currentDate },
    }).populate("serviceProvider");
  }
  if (!journeys) res.status(404).json({ message: "no tickets found" });
  for (let journey of journeys) {
    const ticket = {
      journeyID: journey._id,
      date: journey.date,
      status: journey.status,
      isDeparting: false,
      serviceProvider: journey.serviceProvider,
      time: journey.departureTimeFromUniversity,
      //search from departingPassengers where passenger = userId and set from to the departingAddress of the user
      from: null,
      to: null,
    };
    const departingPassenger = journey.departingPassengers.find(
      (passenger) => passenger.passenger.toString() === userId
    );
    if (departingPassenger) {
      ticket.from = departingPassenger.departureAddress;
      ticket.to = departingPassenger?.destinationAddress;
      ticket.fromLatLng = departingPassenger.departureLatLng;
      ticket.toLatLng = departingPassenger.destinationLatLng;
      ticket.time = journey.arrivalTimeToUniversity;
      ticket.isDeparting = true;

      ticketsData.push(ticket);
    } else {
      const returningPassenger = journey.returningPassengers.find(
        (passenger) => passenger.passenger.toString() === userId
      );
      if (returningPassenger) {
        ticket.from = returningPassenger.departureAddress;
        ticket.to = returningPassenger?.destinationAddress;
        ticket.fromLatLng = returningPassenger?.departureLatLng;
        ticket.toLatLng = returningPassenger.destinationLatLng;
        ticket.time = journey.departureTimeFromUniversity;
        ticket.isDeparting = false;

        ticketsData.push(ticket);
      }
    }
  }
  res.status(200).json({ tickets: ticketsData });
};
module.exports = getTickets;

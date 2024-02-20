const Journey = require("../models/Journey");
const ServiceProvider = require("../models/ServiceProvider");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
const Bus = require("../models/Bus");

const findUserJourneys = async (from, to, date, currentDate) => {
  const serviceProvider = await ServiceProvider.findOne({
    $or: [
      { [`region.cities.${from}`]: { $exists: true } },
      { [`region.universities.${from}`]: { $exists: true } },
    ],
    $or: [
      { [`region.cities.${to}`]: { $exists: true } },
      { [`region.universities.${to}`]: { $exists: true } },
    ],
  });
  // console.log(serviceProvider);
  if (!serviceProvider) {
    throw new NotFoundError("No service provider found for this route");
  }

  // const startOfDay = new Date(date);
  // startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  // console.log(startOfDay, endOfDay);
  const journeys = await Journey.find({
    serviceProvider: serviceProvider._id,
    date: { $gte: currentDate, $lte: endOfDay },
  })
    .populate("bus serviceProvider")
    .exec();
  return journeys._doc;
};
const findDriverJourneys = async (req, res, date) => {
  const driver = req.user;
  const serviceProvider = await ServiceProvider.findOne({ drivers: driver });
  if (!serviceProvider) throw new UnauthenticatedError("You are not a driver");
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  // console.log(startOfDay, endOfDay);
  const journeys = await Journey.find({
    serviceProvider: serviceProvider._id,
    date: { $gte: startOfDay, $lte: endOfDay },
  })
    .populate("bus driver")
    .exec();
  //remove some fields from the response
  const response = [];
  journeys.forEach((journey) => {
    response.push({
      _id: journey._id,
      bus: journey.bus.busNumber,
      departingPassengers: journey.departingPassengers.length,
      returningPassengers: journey.returningPassengers.length,
      driverName: journey?.driver?.name,
      driverID: journey?.driver?._id,
      departingFromUniversity: journey.departureTimeFromUniversity,
      arrivingToUniversity: journey.arrivalTimeToUniversity,
      busSeats: journey.bus.numberOfSeats,
    });
  });
  return response;
};

const journeys = async (req, res) => {
  let io = req.app.get("io");
  const { from, to, date, currentDate } = req.query;
  if (!from && !to && !currentDate) {
    // console.log(journeys);
    console.log("driver" + date);
    const journeys = await findDriverJourneys(req, res, date);
    res.status(200).json({ journeys });
    return;
  }
  if (!from || !to || !date || !currentDate) {
    throw new BadRequestError("Missing query parameters");
  }
  const journeys = await findUserJourneys(from, to, date, currentDate);
  res.status(200).json({ journeys });
};
const journeyById = async (req, res) => {
  // console.log(req.params.id);
  const { type } = req.query;
  const journey = await Journey.findById(req.params.id)
    .populate("bus serviceProvider")
    .exec();

  if (!journey) {
    throw new NotFoundError("Journey not found");
  }
  const userInDepartingJourney = journey.departingPassengers.find(
    (user) => user.passenger.toString() === req.user
  );
  const userInReturningJourney = journey.returningPassengers.find(
    (user) => user.passenger.toString() === req.user
  );
  const user = userInDepartingJourney || userInReturningJourney;
  if (user && type === "ticket") {
    const responseData = {
      provider: journey.serviceProvider.businessName,
      bus: journey.bus.busNumber,
      date: journey.date,
      status: journey.status,

      departure: user.departureAddress,
      destination: user.destinationAddress,
      departureLatLng: user.departureLatLng,
      destinationLatLng: user.destinationLatLng,
    };
    res.status(200).json(responseData);
  } else res.status(200).json({ journey });
};
module.exports = { journeys, journeyById };

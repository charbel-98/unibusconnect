const Journey = require("../models/Journey");
const ServiceProvider = require("../models/ServiceProvider");
const { BadRequestError } = require("../errors");
const Bus = require("../models/Bus");
const journeys = async (req, res) => {
  let io = req.app.get("io");
    const { from, to, date, currentDate } = req.query;
    if (!from || !to || !date || !currentDate) {
      throw new BadRequestError("Missing query parameters");
    }

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
      res.status(404).json({ message: "No service provider found" });
      return;
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
    // console.log(journeys);
    res.status(200).json({ journeys });
};
const journeyById = async (req, res) => {
    // console.log(req.params.id);
    const { type } = req.query;
    const journey = await Journey.findById(req.params.id)
      .populate("bus serviceProvider")
      .exec();

    if (!journey) {
      res.status(404).json({ message: "Journey not found" });
      return;
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

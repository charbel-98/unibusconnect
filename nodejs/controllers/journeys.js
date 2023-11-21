const Journey = require("../models/Journey");
const ServiceProvider = require("../models/ServiceProvider");
const { BadRequestError } = require("../errors");
const Bus = require("../models/Bus");
const journeys = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    if (!from || !to || !date) {
      throw new BadRequestError("Missing query parameters");
    }

    const serviceProvider = await ServiceProvider.findOne({
      $or: [{ "region.cities": from }, { "region.universities": from }],
      $or: [{ "region.cities": to }, { "region.universities": to }],
    });
    console.log(serviceProvider);
    if (!serviceProvider) {
      res.status(404).json({ message: "No service provider found" });
      return;
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    console.log(startOfDay, endOfDay);
    const journeys = await Journey.find({
      serviceProvider: serviceProvider._id,
      date: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("bus serviceProvider")
      .exec();
    console.log(journeys);
    res.status(200).json({ journeys });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const journeyById = async (req, res) => {
  try {
    console.log(req.params.id);
    const journey = await Journey.findById(req.params.id.split(":")[2])
      .populate("bus serviceProvider")
      .exec();

    if (!journey) {
      res.status(404).json({ message: "Journey not found" });
      return;
    }

    res.status(200).json({ journey });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
module.exports = { journeys, journeyById };

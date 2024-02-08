const express = require("express");
const router = express.Router();
const Journey = require("../models/Journey");
const ServiceProvider = require("../models/ServiceProvider");

router.get("/", async (req, res) => {
    const regions = await ServiceProvider.find(
      {},
      {
        _id: 0,
        region: 1,
      }
    );
    const cities = [];
    const universities = [];

    regions.forEach((region) => {
      cities.push(
        region.region.cities.map((cityObj) => Object.keys(cityObj)[0])
      );
      universities.push(
        region.region.universities.map((univObj) => Object.keys(univObj)[0])
      );
    });
    console.log("regions" + regions);
    console.log(cities, universities);
    res.status(200).json({ success: true, cities, universities });
});

module.exports = router;

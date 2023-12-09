const { BadRequestError } = require("../errors");
const NotFoundError = require("../errors/not-found-error");
const User = require("../models/User");

const setDefaultLocation = async (req, res) => {
  try {
    const { userId, defaultLocation } = req.body;

    // Ensure userId is provided
    if (!userId) {
      throw new BadRequestError("User ID is missing");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Assuming defaultLocation has lat and lng properties
    user.defaultLocation.lat = defaultLocation.lat;
    user.defaultLocation.lng = defaultLocation.lng;

    await user.save();

    res.status(200).json({ message: "Default location set successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = setDefaultLocation;

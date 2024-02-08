const { BadRequestError } = require("../errors");
const NotFoundError = require("../errors/not-found-error");
const User = require("../models/User");

const setDefaultLocation = async (req, res) => {
    const { userId, defaultLocation, defaultAddress } = req.body;
    console.log(defaultLocation, defaultAddress);
    // Ensure userId is provided
    const split_address = defaultAddress.split(",");
    const address =
      split_address[0].trim() === split_address[1].trim()
        ? split_address[0] + ", " + split_address[2]
        : defaultAddress;
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
    user.defaultAddress = address;

    await user.save();

    res.status(200).json({
      message: "Default location set successfully",
      defaultLocation: user.defaultLocation,
      defaultAddress: user.defaultAddress,
    });
};

module.exports = setDefaultLocation;

const User = require("../models/User");
const { BadRequestError } = require("../errors");
const { sendNotification } = require("../utils/sendNotification");
const updateProfile = async (req, res) => {
    const userID = req.user;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      throw new BadRequestError("Missing required fields");
    }

    const user = await User.findOneAndUpdate(
      { _id: userID },
      {
        name,
        email,
        mobile: phone,
      }
    );

    sendNotification(req, {
      message: `Your profile has been updated successfully`,
      type: "confirmation",
    });
    res.status(200).json({
      message: "Your profile has been updated successfully",
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
};
module.exports = updateProfile;

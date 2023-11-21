const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { BadRequestError } = require("../errors");
const register = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  if (!name || !email || !password || !mobile) {
    throw new BadRequestError("please provide all the details");
  }
  // check for duplicate usernames in the db
  const existingUser = await User.findOne({ email });
  const existingMobile = await User.findOne({ mobile });
  if (existingUser || existingMobile) {
    res.status(409).json({ success: false, message: "Already registered" }); // conflict
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
    });
    console.log(user);
    res.status(201).json({ success: true, message: "successfully registered" });
  }
};
module.exports = register;

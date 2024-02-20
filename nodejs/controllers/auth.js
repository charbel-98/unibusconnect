const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSign = require("../utils/jwtSign");
require("dotenv").config();

const login = async (req, res) => {
  const cookies = req.cookies;
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const { mobileOrEmail, password } = req.body;
  if (!mobileOrEmail) {
    throw new BadRequestError("please provide email or mobile");
  }
  if (!password) {
    throw new BadRequestError("please provide password");
  }
  let user = await User.findOne({ mobile: mobileOrEmail });
  if (!user) {
    user = await User.findOne({ email: mobileOrEmail });
    if (!user) throw new UnauthenticatedError("invalid credentials");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid credentials");
  }
  //jwt logic goes here
  const accessToken = jwtSign({ userID: user._id, role: user.role }, "15min");
  console.log("user ID: " + user._id);
  const newRefreshToken = jwtSign({ userID: user._id, role: user.role }, "1d");
  let newRefreshTokenArray = !cookies?.jwt
    ? user.refreshToken
    : user.refreshToken.filter((rt) => rt !== cookies.jwt);
  if (cookies.jwt) {
    /* 
      Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
      */
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundUser) {
      console.log("attempted refresh token reuse at login!");
      // clear out ALL previous refresh tokens
      newRefreshTokenArray = [];
    }

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.mode != 'development',
      sameSite: process.env.mode == 'development' ? "strict" : "none",
    });
  }

  // Saving refreshToken with current user
  user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  const result = await user.save();
  console.log(result);
  // user role 
  console.log("check user role", user.role);
  if (user.role != "client") {
    // redirect to admin link with parameters to get the user role
    console.log("role", user.role);
    res.redirect(`http://localhost:5174?accessToken=${accessToken}&refreshToken=${newRefreshToken}`);
    return;
  }
  // Creates Secure Cookie with refresh token
  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: process.env.mode != 'development',
    sameSite: process.env.mode == 'development' ? "strict" : "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  // Send authorization roles and access token to user
  res.status(200).json({
    success: true,
    message: "successfully logged in",
    accessToken,
    user: {
      email: user.email,
      name: user.name,
      mobile: user.mobile,
      defaultLocation: user.defaultLocation,
      id: user._id,
      defaultAddress: user.defaultAddress,
    },
  });
};

function getUsers(req, res) {
  User.find().then((users) => {
    res.status(200).json(users);
  });
}
module.exports = { login, getUsers };

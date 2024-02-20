const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  ForbiddenError,
  UnauthenticatedError,
} = require("../errors/forbidden-error");
const jwtSign = require("../utils/jwtSign");
const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    return res.status(403).json({ message: "invalid refresh token" });
  }

  const refreshToken = cookies.jwt;
  console.log(`refresh token available at refresh: ${refreshToken}`);
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.mode != 'development',
    sameSite: process.env.mode == 'development' ? "strict" : "none",
  });
  const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

  //detect reuse of refresh token
  if (!foundUser) {
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "invalid refresh token1" });
      }
      console.log("attempted refresh token reuse at refreshToken!");
      console.log(decoded);
      const hackedUser = await User.findById(decoded.userID).exec();
      console.log(hackedUser);
      hackedUser.refreshToken = [];
      const result = await hackedUser.save();
      console.log(result);
    });
    return res.status(403).json({ message: "refresh token reuse detected" });
  }
  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  //check if refresh token is valid
  jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log("expired refresh token");
      foundUser.refreshToken = [...newRefreshTokenArray];
      const result = await foundUser.save();
      console.log(result);
    }
    console.log(decoded);
    if (err || foundUser._id.toString() !== decoded.userID) {
      return res.status(403).json({ message: "invalid refresh token" });
    }
    // Refresh token was still valid

    const accessToken = jwtSign({ userID: foundUser._id, role: foundUser.role }, "15min");

    const newRefreshToken = jwtSign({ userID: foundUser._id, role: foundUser.role }, "1d");
    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: process.env.mode != 'development',
      sameSite: process.env.mode == 'development' ? "strict" : "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      accessToken,
      user: {
        email: foundUser.email,
        name: foundUser.name,
        mobile: foundUser.mobile,
        defaultLocation: foundUser.defaultLocation,
        avatar: foundUser.avatar,
        id: foundUser._id,
        defaultAddress: foundUser.defaultAddress,
      },
    });
  });
};
module.exports = refreshToken;

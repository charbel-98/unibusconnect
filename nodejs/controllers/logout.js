const User = require("../models/User");

const logout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.MODE != 'development',
      sameSite: process.env.MODE == 'development' ? "strict" : "none",
    });
    return res.sendStatus(201);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.MODE != 'development',
    sameSite: process.env.MODE == 'development' ? "strict" : "none",
  });
  res.sendStatus(204);
};
module.exports = logout;

const User = require('../models/User');
const mongoose = require('mongoose');

const driverLogin = async (req, res) => {
    const { accessToken, refreshToken } = req.query;
    // console.log(accessToken, refreshToken);
    console.log("user", req.user);
    if (!req.user || req.role != "driver") return res.status(403).json({ message: "You are not authorized to access this route" });
    const userData = await User.findById(req.user);
    console.log(userData);
    if (!userData) return res.status(403).json({ message: "You are not authorized to access this route" });
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: process.env.MODE != 'development',
        sameSite: process.env.MODE == 'development' ? "strict" : "none",
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken, user: userData });
};

module.exports = driverLogin;
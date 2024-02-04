const User = require('../models/User');
const mongoose = require('mongoose');

const driverLogin = async (req, res) => {
    const { accessToken, refreshToken } = req.query;
    // console.log(accessToken, refreshToken);
    console.log("user", req.user);
    const userData = await User.findById(req.user);
    console.log(userData);
    if (userData) {
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ accessToken, user: userData });
    }
};

module.exports = driverLogin;
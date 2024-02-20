const jwt = require("jsonwebtoken");

const jwtSign = (payload, expireTime) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expireTime });
};

module.exports = jwtSign;
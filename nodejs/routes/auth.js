const express = require("express");
const router = express.Router();
const passport = require("passport");
const { login, getUsers } = require("../controllers/auth");
const authenticateJWT = require("../middleware/authenticateJWT");

//!these routes are for email id  authentication
router.post("/login", login);
router.get("/users", authenticateJWT, getUsers);
//!these routes are for google authentication
router.get("/login/failed", (req, res) => {
  console.log("failed");
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http:localhost:5173/login/error",
    // successRedirect: "http://localhost:5173/",
    session: false,
  }),
  (req, res) => {
    console.log("----------------------------->" + JSON.stringify(req.user));
    if (req.user.role != "client") {
      res.redirect(
        `http://localhost:5174?accessToken=${req.user.accessToken}&refreshToken=${req.user.refreshToken}`
      );
      return;
    }
    res.cookie("jwt", req.user.refreshToken, {
      httpOnly: true,
      secure: process.env.MODE != 'development',
      sameSite: process.env.MODE == 'development' ? "strict" : "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:5173/");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;

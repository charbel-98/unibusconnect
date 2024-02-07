const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./models/User");
const { login } = require("./controllers/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists in our own db
        console.log("profile", profile);
        const currentUser = await User.findOne({ googleId: profile.id });

        if (currentUser) {
          currentUser.refreshToken = [];
          await currentUser.save();
          const newRefreshToken = jwt.sign(
            { userID: currentUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          const newAccessToken = jwt.sign(
            {
              userID: currentUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "10s" }
          );
          currentUser.refreshToken = [newRefreshToken];
          await currentUser.save();

          console.log("user is: ", currentUser);
          done(null, {
            ...currentUser._doc,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
        } else {
          // if not, create user in our db
          const newUser = new User({
            email: profile.emails[0].value,
            googleId: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value,
          });
          await newUser.save();
          const newRefreshToken = jwt.sign(
            { userID: newUser._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          const newAccessToken = jwt.sign(
            {
              userID: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "10s" }
          );
          newUser.refreshToken = newRefreshToken;
          await newUser.save();
          console.log("created new user: ", newUser);
          done(null, {
            ...newUser,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });
        }
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);

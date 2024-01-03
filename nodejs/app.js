require("dotenv").config();
require("express-async-errors");
require("./cron-scheduler/scheduler");
const http = require("http");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const initializeSocketServer = require("./socketServer"); // error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticateJWT = require("./middleware/authenticateJWT");

const app = express();
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
//routes
app.use("/api/v1/register", require("./routes/register"));
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/refresh", require("./routes/refreshToken"));
app.use("/api/v1/logout", require("./routes/logout"));

//protected routes
app.use(authenticateJWT);
app.use("/api/v1/journeys", require("./routes/journeys"));
app.use("/api/v1/reservation", require("./routes/reservation"));
app.use("/api/v1/regions/supported", require("./routes/regions"));
app.use("/api/v1/setdefaultlocation", require("./routes/setDefaultLocation"));
app.use("/api/v1/tickets", require("./routes/tickets"));
//error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
  }
};

start();
const server = http.createServer(app);
const io = initializeSocketServer({ server, app, userID: app?.req?.user });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server is listening on port 3000...");
});

module.exports = { app, io };

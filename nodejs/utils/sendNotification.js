const sendNotification = (req, { message, type }, userID) => {
  let globalUserSocketMap = req.app.get("globalUserSocketMap");
  let io = req.app.get("io");
  const socketId = globalUserSocketMap.get(userID || req.user);
  if (socketId.length > 0) {
    socketId.forEach((id) => {
      io.to(id).emit("notification", {
        message,
        type,
      });
    });
  }
};
const notificationController = async (req, res) => {
  try {
    const { departingPassengers, returningPassengers, message, type } =
      req.body;
    if (!departingPassengers && !returningPassengers) {
      res.sendStatus(400);
    }
    departingPassengers.forEach((passenger) => {
      sendNotification(req, { message, type: "ticket" }, passenger);
    });
    returningPassengers.forEach((passenger) => {
      sendNotification(req, { message, type }, passenger);
    });
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

module.exports = { sendNotification, notificationController };

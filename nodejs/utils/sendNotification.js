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
module.exports = sendNotification;

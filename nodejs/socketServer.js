const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const initializeSocketServer = ({ server, app }) => {
  const globalUserSocketMap = new Map(); // Map to store the global mapping between userId and socketId
  // const notificationMap = new Map(); // Map to store notifications for each user

  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    // console.log(socket);
    console.log(`Socket connected: ${socket.id}`);

    socket.on("user", (user) => {
      console.log(`User connected: `, user, socket.id);
      globalUserSocketMap.set(user.id, socket.id);
      jwt.verify(user.auth, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return console.error(err); //invalid token
        globalUserSocketMap.set(decoded.userID, socket.id);
        socket.userId = decoded.userID;
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id} `, socket.userId);
      globalUserSocketMap.delete(socket.userId);
    });

  });

  // Attach the io instance, globalUserSocketMap, and notificationMap to the Express app
  app.set("io", io);
  app.set("globalUserSocketMap", globalUserSocketMap);
  // app.set("notificationMap", notificationMap);

  return io;
};

module.exports = initializeSocketServer;

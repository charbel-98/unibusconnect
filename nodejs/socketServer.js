const { Server } = require("socket.io");

const initializeSocketServer = ({ server, app, userID }) => {
  const globalUserSocketMap = new Map(); // Map to store the global mapping between userId and socketId
  const notificationMap = new Map(); // Map to store notifications for each user

  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Assuming you have userId available in the request object (req.user)
    const userId = userID;
    console.log("''''''''''''''''''''''''''''''''''''''''''''''''''");
    console.log(userId);
    // Store the mapping between userId and socketId in the global map
    globalUserSocketMap.set(userId, socket.id);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);

      // Remove the mapping when a socket disconnects
      globalUserSocketMap.delete(userId);
    });
  });

  // Attach the io instance, globalUserSocketMap, and notificationMap to the Express app
  app.set("io", io);
  app.set("globalUserSocketMap", globalUserSocketMap);
  app.set("notificationMap", notificationMap);

  return io;
};

module.exports = initializeSocketServer;

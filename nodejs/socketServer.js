const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const initializeSocketServer = ({ server, app }) => {
  const globalUserSocketMap = new Map(); // Map to store the global mapping between userId and socketId

  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    // console.log(socket);
    console.log(`Socket connected: ${socket.id}`);

    socket.on("user", (user) => {
      console.log(`User connected: `, socket.id, user.auth);
      jwt.verify(user.auth, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return console.error(err); //invalid token
        if (globalUserSocketMap.has(decoded.userID)) {
          io.sockets.sockets.get(globalUserSocketMap.get(decoded.userID))?.disconnect();
        }
        globalUserSocketMap.set(decoded.userID, socket.id);
        socket.userId = decoded.userID;
      });
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id} `, socket.userId);
      globalUserSocketMap.delete(socket.userId);
    });

  });

  // Attach the io instance, globalUserSocketMap to the Express app
  app.set("io", io);
  app.set("globalUserSocketMap", globalUserSocketMap);

  return io;
};

module.exports = initializeSocketServer;

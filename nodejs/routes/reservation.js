const express = require("express");
const router = express.Router();
const reservation = require("../controllers/reservation");
// (req, res) => {
//   reservation(req, res, (notificationData) => {
//     // Emit the notification event to all sockets in the journey
//     const journeyId = req.params.journeyId; // Adjust this based on your actual journey identifier
//     const journeySocketsMap = req.app.get("journeySocketsMap");
//     const journeySockets = journeySocketsMap.get(journeyId) || [];

//     journeySockets.forEach((socketId) => {
//       req.io.to(socketId).emit("notification", notificationData);
//     });

//     // Store the notification for users who might not be connected
//     const notificationsMap = req.app.get("notificationsMap");
//     journeySocketsMap.forEach((sockets, journeyId) => {
//       sockets.forEach((socketId) => {
//         if (!journeySockets.includes(socketId)) {
//           const storedNotifications = notificationsMap.get(socketId) || [];
//           storedNotifications.push(notificationData);
//           notificationsMap.set(socketId, storedNotifications);
//         }
//       }
router.post("/register/:id", reservation);

module.exports = router;

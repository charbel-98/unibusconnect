const Journey = require("../models/Journey");
const { sendNotification } = require("../utils/sendNotification");
const cancelReservation = (req, res) => {
  const user = req.user;
  const journeyId = req.params.journeyId;
  console.log(
    journeyId +
      "-----------------------------------------------------------------------"
  );

  Journey.findById(journeyId)
    .then((journey) => {
      if (!journey) {
        return res.status(404).json({ message: "Journey not found" });
      }
      //check for user in departing and returning passengers arrays
      const departingPassengerIndex = journey.departingPassengers.findIndex(
        (passenger) => passenger.passenger._id.equals(user)
      );
      const returningPassengerIndex = journey.returningPassengers.findIndex(
        (passenger) => passenger.passenger._id.equals(user)
      );
      if (departingPassengerIndex === -1 && returningPassengerIndex === -1) {
        return res.status(404).json({ message: "User not found" });
      }
      //remove user from passengers array
      if (departingPassengerIndex !== -1) {
        journey.departingPassengers.splice(departingPassengerIndex, 1);
      }
      if (returningPassengerIndex !== -1) {
        journey.returningPassengers.splice(returningPassengerIndex, 1);
      }
      //save journey
      if (
        journey.departingPassengers.length < 1 &&
        journey.returningPassengers.length < 1
      ) {
        journey.status = "Pending";
      }
      journey.save().then((journey) => {
        sendNotification(
          req,
          {
            message: "Your reservation has been cancelled",
            type: "confirmation",
          },
          user
        );
      });
      return res
        .status(200)
        .json({ message: "Reservation cancelled successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Something went wrong" });
    });
};
module.exports = { cancelReservation };

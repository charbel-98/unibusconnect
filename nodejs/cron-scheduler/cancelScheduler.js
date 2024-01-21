const Journey = require("../models/Journey");
const cron = require("node-cron");
const Notification = require("../models/Notification");
const UserNotification = require("../models/UserNotification");
const schedule = "02 22-23,0-8 * 9-1,3-6 0-5";
const task = async () => {
  try {
    const today = new Date();
    const hour = today.getHours();

    // Format the current time
    const formattedTime = `${hour + 7}:00${hour + 7 > 12 ? "PM" : "AM"}`;

    // Set seconds and milliseconds to 0
    today.setSeconds(0, 0);

    console.log(formattedTime);

    const startOfDay = new Date(today);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // Set end of day to 23:59:59.999

    const journey = await Journey.find({
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      arrivalTimeToUniversity: formattedTime,
    });

    console.log(
      "scheduleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    );
    console.log(journey);
    if (!journey) {
      return;
    }

    journey.forEach(async (j) => {
      if (j.status === "Pending") {
        j.status = "Cancelled";
        await j.save();
        const notification = await Notification.create({
          message: `Your journey on ${j.date.toISOString().split("T")[0]} at ${
            j.arrivalTimeToUniversity
          } has been cancelled`,
          type: "cancelation",
        });
        const passengers = j.departingPassengers.map((person) =>
          person.passenger.toString()
        );
        const passengers2 = j.returningPassengers.map((person) =>
          person.passenger.toString()
        );
        passengers?.forEach(async (passenger) => {
          UserNotification.create({
            userID: passenger,
            notificationID: notification._id,
          });
        });
        passengers2?.forEach(async (passenger) => {
          UserNotification.create({
            userID: passenger,
            notificationID: notification._id,
          });
        });
        fetch("http://localhost:3000/api/v1/privateNotifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.JWT_SECRET}`,
          },
          body: JSON.stringify({
            departingPassengers: passengers,
            returningPassengers: passengers2,
            message:
              "Your journey on " +
              j.date.toISOString().split("T")[0] +
              " at " +
              j.arrivalTimeToUniversity +
              " has been cancelled",
            type: "cancelation",
          }),
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
cron.schedule(schedule, task);

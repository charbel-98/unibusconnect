const Journey = require("../models/Journey");
const cron = require("node-cron");

const schedule = "48 22-23,0-8 * 9-1,3-6 0-5";
const task = async () => {
  const today = new Date();
  today.setHours(today.getHours() + 10);
  today.setMinutes(0, 0);

  console.log(today);
  const journey = await Journey.find({
    date: today,
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
      const passengers = j.departingPassengers.map((person) => person._id);
      const passengers2 = j.returningPassengers.map((person) => person._id);
      fetch("http://localhost:3000/api/v1/notifications", {
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
            j.date +
            " at" +
            j.arrivalTime +
            "has been cancelled",
          type: "cancelation",
        }),
      });
    }
  });
};
cron.schedule(schedule, task);

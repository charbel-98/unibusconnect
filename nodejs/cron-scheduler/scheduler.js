const cron = require("node-cron");
const isHoliday = require("./holiday");
const ServiceProvider = require("../models/ServiceProvider");
const Journey = require("../models/Journey");
const Bus = require("../models/Bus");
const schedule = "0 22 * 9-1,3-6 3"; // Every Saturday at midnight (0:00)
function getUpcomingWeekDates(today) {
  const upcomingWeekDates = [];

  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    const daysUntilNextWeek = (1 + 7 - today.getDay()) % 7; // Days until the next Monday
    date.setDate(today.getDate() + daysUntilNextWeek + i - 1); // Move to the next Monday to Friday
    upcomingWeekDates.push(date);
  }

  return upcomingWeekDates;
}

const task = () => {
  const today = new Date();
  const upcomingWeekDates = getUpcomingWeekDates(today);
  upcomingWeekDates.forEach(async (date) => {
    if (!isHoliday(date)) {
      ServiceProvider.findOne({ name: "Semaan Tannous" }).then(async (sp) => {
        console.log(sp);
        const buses = await Bus.find({
          serviceprovider: sp._id,
        }).exec();
        const small = buses.filter((bus) => bus.size === "small");
        const medium = buses.filter((bus) => bus.size === "medium");
        const large = buses.filter((bus) => bus.size === "large");
        console.log("buses ... " + buses);
        console.log(small, medium, large);
        Journey.create({
          serviceProvider: sp._id,
          date: date.setHours(8, 0),
          arrivalTimeToUniversity: "08:00AM",
          departureTimeFromUniversity: "08:10AM",
          bus: medium[0]._id,
        });
        Journey.create({
          serviceProvider: sp._id,
          date: date.setHours(9, 0),
          arrivalTimeToUniversity: "09:00AM",
          departureTimeFromUniversity: "09:10AM",
          bus: medium[1]._id,
        });
        Journey.create({
          serviceProvider: sp._id,
          date: date.setHours(10, 0),
          arrivalTimeToUniversity: "10:00AM",
          departureTimeFromUniversity: "10:10AM",
          bus: medium[2]._id,
        });
        Journey.create({
          serviceProvider: sp._id,
          date: date.setHours(11, 0),
          arrivalTimeToUniversity: "11:00AM",
          departureTimeFromUniversity: "11:10AM",
          bus: medium[3]._id,
        });
        Journey.create({
          serviceProvider: sp._id,
          date: date.setHours(14, 0),
          arrivalTimeToUniversity: "02:00PM",
          departureTimeFromUniversity: "02:10PM",
          bus: medium[3]._id,
        });
        Journey.create({
          serviceProvider: sp._id,
          date: date.setHours(15, 0),
          arrivalTimeToUniversity: "03:00PM",
          departureTimeFromUniversity: "03:10PM",
          bus: medium[2]._id,
        });
        Journey.create({
          serviceProvider: sp._id,
          date: date.setHours(17, 0),
          arrivalTimeToUniversity: "05:00PM",
          departureTimeFromUniversity: "05:10PM",
          bus: medium[1]._id,
        });
      });
    }
  });
};

cron.schedule(schedule, task);

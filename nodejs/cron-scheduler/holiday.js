const {
  calculateEasterDate,
  calculateEasterHolidays,
} = require("./easterHoliday");
function isEasterHoliday(date) {
  const easterDate = calculateEasterDate(date.getFullYear());
  const { easterFriday, easterMonday } = calculateEasterHolidays(easterDate);
  const dateString = date.toISOString().split("T")[0]; // Get the date part of the ISO string

  return (
    dateString === easterMonday.toISOString().split("T")[0] ||
    dateString === easterFriday.toISOString().split("T")[0]
  );
}
function isHoliday(date) {
  if (isEasterHoliday(date)) return true;
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1

  const holidays = [
    { day: 22, month: 11 }, // 22nd November
    { day: 25, month: 12 }, // 25th December
    { day: 1, month: 1 }, // 1st January
    { day: 6, month: 1 }, // 6th January
  ];

  return holidays.some(
    (holiday) => holiday.day === day && holiday.month === month
  );
}
module.exports = isHoliday;

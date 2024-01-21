const { BadRequestError } = require("../errors");
const NotFoundError = require("../errors/not-found-error");
const UserNotification = require("../models/UserNotification");
const mongoose = require("mongoose");
const notification = require("../models/Notification");
const getNotifications = async (req, res) => {
  try {
    const { user: userId } = req;
    console.log(userId);
    // Ensure userId is provided
    if (!userId) {
      res.send(400).json({ error: "User ID is required" });
    }

    const userNotifications = await UserNotification.aggregate([
      {
        $match: { userID: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "notifications",
          localField: "notificationID",
          foreignField: "_id",
          as: "notificationData",
        },
      },
      {
        $unwind: "$notificationData",
      },
      {
        $project: {
          message: "$notificationData.message",
          date: "$notificationData.date",
          type: "$notificationData.type",
          seen: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: "$$ROOT",
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $limit: 20,
      },
    ]);

    /* 
        {
            "userNotifications": [
                {
                    "_id": "659719f15e405a5446bd008d",
                    "userID": "656127ec59db4b2a6eae3787",
                    "notificationID": "659719f15e405a5446bd008b",
                    "seen": false,
                    "__v": 0
                },
                {
                    "_id": "65971c7995a52b45d87ab412",
                    "userID": "656127ec59db4b2a6eae3787",
                    "notificationID": "65971c7895a52b45d87ab410",
                    "seen": false,
                    "__v": 0
                },
            ]
        }
         */
    console.log(userNotifications);
    res.status(200).json({
      //   message: "Notifications fetched successfully",
      notifications: userNotifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getNotifications;

const mongoose = require("mongoose");
const Bus = require("./Bus");
const ServiceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  businessName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  region: {
    cities: {
      type: [Object],
      required: true,
    },
    universities: {
      type: [Object],
      required: true,
    },
  },
  //drivers field is an array of mongoose object id refering to a user
  drivers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const ServiceProvider = mongoose.model(
  "ServiceProvider",
  ServiceProviderSchema
);

// const serviceProviderData = {
//   name: "Semaan Tannous",
//   region: {
//     from: ["Kferhabo", "Zgharta", "Arde", "Mejdlaya"],
//     to: ["LIU Dahr Al Ain", "Lebanese University Dahr Al Ain"],
//   },
// };

// // Use the create method to add the ServiceProvider to the database
// ServiceProvider.create(serviceProviderData)
//   .then((createdServiceProvider) => {
//     console.log("ServiceProvider added:", createdServiceProvider);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

module.exports = ServiceProvider;

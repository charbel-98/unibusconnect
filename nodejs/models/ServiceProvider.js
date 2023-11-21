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
      type: [String],
      required: true,
    },
    universities: {
      type: [String],
      required: true,
    },
  },
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

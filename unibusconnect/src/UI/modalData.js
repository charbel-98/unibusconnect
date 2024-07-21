import { set } from "date-fns";

export const modal_Data = (
  setActive,
  setShowModal,
  currentLocation,
  address,
  defaultLocation,
  defaultAddress,
  reserve,
  setModalData
) => ({
  //! this file is to be changed since I realized I want to show more modals after reserving for the user showing them the success of the reservation and the details of the reservation
  //! and asking them if they want to set the current location as default or if they want to browse fot the returning journeys directly without filtering again
  noLocation: {
    title: "Warning",
    description: "You need to set your location to reserve!",
    buttons: [
      {
        text: "set my location",
        class: "btn text-light bg-danger",
        function: () => {
          setActive({
            info: false,
            review: false,
            pickup: true,
          });
          setShowModal(false);
        },
      },
    ],
  },
  noCurrentLocationWithDefaultLocation: {
    title: "Confirmation",
    description:
      "Your default location would be set as your pickup location, do you want to continue?",
    buttons: [
      {
        text: "Change",
        class: "btn text-light bg-secondary",
        function: () => {
          setActive({
            info: false,
            review: false,
            pickup: true,
          });
          setShowModal(false);
        },
      },
      {
        text: "Reserve",
        class: "btn text-light bg-danger",
        function: () => {
          setShowModal(false);
          reserve(defaultLocation, defaultAddress);
        },
      },
    ],
  },
  noDefaultLocationWithCurrentLocation: {
    title: "Confirmation",
    description: "Would you like to set this location as default?",
    buttons: [
      {
        text: "no",
        class: "btn text-light bg-secondary",
        function: () => {
          setShowModal(false);
        },
      },
      {
        text: "yes",
        class: "btn text-light bg-danger",
        function: () => {
          setShowModal(false);
        },
      },
    ],
  },
  withCurrentLocationAndDefaultLocation: {
    title: "Confirmation",
    description: "A new location was provided, do you want to continue?",
    buttons: [
      {
        text: "Change",
        class: "btn text-light bg-secondary",
        function: () => {
          setActive({
            info: false,
            review: false,
            pickup: true,
          });
          setShowModal(false);
        },
      },
      {
        text: "Reserve with default",
        class: "btn text-light bg-secondary",
        function: () => {
          setShowModal(false);
          reserve(defaultLocation, defaultAddress);
        },
      },
      {
        text: "Reserve",
        class: "btn text-light bg-danger",
        function: () => {
          setShowModal(false);
          reserve(currentLocation, address);
        },
      },
    ],
  },
});

import { set } from "date-fns";
const setCurrentLocationAsDefault = {
  title: "Confirmation",
  description: "Would you like to set this location as default?",
  buttons: [
    {
      text: "no",
      class: "btn text-light bg-secondary",
      function: () => {
        setShowModal(false);
        reserve(currentLocation);
      },
    },
    {
      text: "yes",
      class: "btn text-light bg-danger",
      function: () => {
        //set default location here and reserve
        reserve(defaultLocation);
        setShowModal(false);
      },
    },
  ],
};
export const modal_Data = (
  setActive,
  setShowModal,
  currentLocation,
  defaultLocation,
  reserve,
  setModalData
) => ({
  noLocation: {
    title: "Warning",
    description: "You need to set your location before continue.",
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
          reserve(defaultLocation);
        },
      },
    ],
  },
  noDefaultLocationWithCurrentLocation: setCurrentLocationAsDefault,
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
          reserve(defaultLocation);
        },
      },
      {
        text: "Reserve",
        class: "btn text-light bg-danger",
        function: () => {
          setShowModal(false);
          reserve(currentLocation);
          setModalData(setCurrentLocationAsDefault);
          setShowModal(true);
        },
      },
    ],
  },
});

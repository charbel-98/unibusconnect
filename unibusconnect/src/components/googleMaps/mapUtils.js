import { useMemo, useCallback, useEffect } from "react";

export const getCenter = (home) =>
  useMemo(() => {
    return {
      lat: home?.lat ? parseFloat(home?.lat) : 34.3963159,
      lng: home?.lng ? parseFloat(home.lng) : 35.89584450000007,
    };
  }, [home?.lat, home?.lng]);

export const fetchDirections = (
  home,
  isLoaded,
  isDeparting,
  university,
  setDirections
) => {
  if (!home) return;
  if (!isLoaded) return;

  const service = new google.maps.DirectionsService();
  service.route(
    {
      origin: isDeparting ? home : university,
      destination: isDeparting ? university : home,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK" && result) {
        setDirections(result);
        console.log(result);
      }
    }
  );
};

export const scrollToBottom = (withDirection) => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

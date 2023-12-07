import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useRef, useMemo, useState } from "react";
const Map = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDlXmTnz1ntfdhkloeT7HZ2jtJ0fWQPgos",
  });
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
    console.log(
      "Latitude: " +
        position.coords.latitude +
        "Longitude: " +
        position.coords.longitude
    );
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred.";
        break;
    }
  }
  const mapRef = useRef();
  const center = useMemo(
    () => ({
      lat: lat ? parseFloat(lat) : 34.3963159,
      lng: lng ? parseFloat(lng) : 35.89584450000007,
    }),
    // () => ({ lat: 34.3963159, lng: 35.89584450000007 }),
    [lat, lng]
  );
  getLocation();
  if (!isLoaded) return <div>loading...</div>;
  return (
    <GoogleMap
      zoom={15}
      center={lat && lng && center}
      options={{ disableDefaultUI: true }}
      mapContainerClassName="map-container"
    >
      <button onClick={getLocation}></button>
      {lat && lng && <Marker position={center}></Marker>}
    </GoogleMap>
  );
};

export default Map;

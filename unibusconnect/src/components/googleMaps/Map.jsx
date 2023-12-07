import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useRef, useMemo, useState } from "react";
const Map = () => {
  const [home, setHome] = useState(null);

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
    setHome((prev) => {
      return { ...prev, lat: position.coords.latitude };
    });
    setHome((prev) => {
      return { ...prev, lng: position.coords.longitude };
    });
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
      lat: home?.lat ? parseFloat(home?.lat) : 34.3963159,
      lng: home?.lng ? parseFloat(home.lng) : 35.89584450000007,
    }),
    // () => ({ lat: 34.3963159, lng: 35.89584450000007 }),
    [home?.lat, home?.lng]
  );
  getLocation();
  if (!isLoaded) return <div>loading...</div>;
  return (
    <>
      <div className="controls">
        <h1>Commute?</h1>
        <Places
          setHome={(position) => {
            setHome(position);
            mapRef.current?.panTo(position);
          }}
        />
        {!home && <p>Enter the address of your office.</p>}
        {/* {directions && <Distance leg={directions.routes[0].legs[0]} />} */}
      </div>
      <GoogleMap
        zoom={15}
        center={{ lat: 34.396663, lng: 35.8426649 }}
        options={{ disableDefaultUI: true }}
        mapContainerClassName="map-container"
      >
        <button onClick={getLocation}>get current location</button>
        {home?.lat && home?.lng && <Marker position={center}></Marker>}
        <Marker position={{ lat: 34.396663, lng: 35.8426649 }}></Marker>
      </GoogleMap>
    </>
  );
};

export default Map;

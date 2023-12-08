import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import Places from "./Places";
const MAPS_LIBRARIES = ["places"];
const Map = () => {
  const [home, setHome] = useState(null);
  console.log(home);
  const [directions, setDirections] = useState();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDlXmTnz1ntfdhkloeT7HZ2jtJ0fWQPgos",
    libraries: MAPS_LIBRARIES,
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
      return {
        lng: position?.coords?.longitude,
        lat: position?.coords?.latitude,
      };
    });

    console.log(
      "Latitude: " +
        position?.coords?.latitude +
        "Longitude: " +
        position?.coords?.longitude
    );
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
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
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const fetchDirections = (uni) => {
    if (!home) return;
    if (!isLoaded) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: uni,
        destination: home,
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

  useEffect(() => {
    mapRef.current?.panTo(home);
    console.log("after");
    fetchDirections({ lat: 34.396663, lng: 35.8426649 });
    console.log("finally");
  }, [home, isLoaded]);
  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [isLoaded]);
  if (!isLoaded) return <div>loading...</div>;
  return (
    <>
      <GoogleMap
        zoom={15}
        center={center}
        options={{ disableDefaultUI: true }}
        mapContainerClassName="map-container"
        onLoad={onLoad}
      >
        <div className="controls">
          <Places
            setHome={(position) => {
              setHome(position);
              console.log("here");
            }}
          />

          {/* {directions && <Distance leg={directions.routes[0].legs[0]} />} */}
        </div>
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: "#d9534f",
                strokeWeight: 5,
              },
            }}
          />
        )}
        <button onClick={getLocation}>get current location</button>
        {home?.lat && home?.lng && <Marker position={center}></Marker>}
        <Marker position={{ lat: 34.396663, lng: 35.8426649 }}></Marker>
      </GoogleMap>
    </>
  );
};

export default Map;

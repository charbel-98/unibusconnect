import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import Places from "./Places";
const MAPS_LIBRARIES = ["places"];
//Map component
const Map = ({ withDirection, universityLat, universityLng }) => {
  //map state including home and university locations
  //home is the current location of the user if he shares it, or via the location input field, or via clicking the map
  const [home, setHome] = useState(null);
  console.log(home);
  //university is the location of the university that the user is going to and it's coming from the database after filtering the universities array
  const [university, setUniversity] = useState({
    lat: universityLat,
    lng: universityLng,
  });
  //directions is the route between the home and the university
  const [directions, setDirections] = useState();
  console.log(university);
  //loading the map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDlXmTnz1ntfdhkloeT7HZ2jtJ0fWQPgos",
    libraries: MAPS_LIBRARIES,
  });
  //getting the filter to identify whether the user is going to the university or coming from it
  const { from, to, date, isDeparting } = JSON.parse(
    localStorage.getItem("filter")
  );
  //getting the current location of the user
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setCurrentHomeLocation,
        showError
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function setCurrentHomeLocation(position) {
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
  //map reference
  const mapRef = useRef();
  //map center using use memo so the map would not return the the static center given to it after each render
  const center = useMemo(
    () => ({
      lat: home?.lat ? parseFloat(home?.lat) : 34.3963159,
      lng: home?.lng ? parseFloat(home.lng) : 35.89584450000007,
    }),
    // () => ({ lat: 34.3963159, lng: 35.89584450000007 }),
    [home?.lat, home?.lng]
  );
  //on load function to set the map reference
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  //fetching the directions between the home and the university
  const fetchDirections = (uni) => {
    if (!home) return;
    if (!isLoaded) return;
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: isDeparting ? home : uni,
        destination: isDeparting ? uni : home,
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
  //get the directions and center the map to home loc after loading and every time home state changes
  useEffect(() => {
    mapRef.current?.panTo(home);
    withDirection && fetchDirections(university);
  }, [home, isLoaded]);
  //get the current location on mount
  useEffect(() => {
    getLocation();
  }, []);
  //scroll to the bottom of the page to get the full map  after loading
  useEffect(() => {
    withDirection &&
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
        onClick={(e) => {
          console.log(e.latLng.lat(), e.latLng.lng());
          setHome({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
        }}
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
        {withDirection && directions && (
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
        {withDirection && (
          <Marker
            position={{ lat: universityLat, lng: universityLng }}
          ></Marker>
        )}
      </GoogleMap>
    </>
  );
};

export default Map;

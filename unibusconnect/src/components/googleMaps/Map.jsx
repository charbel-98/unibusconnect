import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState, useEffect, useCallback } from "react";
import Places from "./Places";
import { getLocation, showError } from "./mapFunctions";
import { getCenter, fetchDirections, scrollToBottom } from "./mapUtils";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/locationSlice";

const MAPS_LIBRARIES = ["places"];

const Map = ({ withDirection, universityLat, universityLng }) => {
  //home and university states for the map
  //home is for the user to set
  //he can share jis current location or choose one by clicking on the map or from the input
  const [home, setHome] = useState(null);
  //uni is from the db which we get after filtering the array of unis based on the users filtration
  const [university, setUniversity] = useState({
    lat: universityLat,
    lng: universityLng,
  });
  //directions state to store the directions from the home to the uni
  const [directions, setDirections] = useState();
  //load the script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDlXmTnz1ntfdhkloeT7HZ2jtJ0fWQPgos",
    libraries: MAPS_LIBRARIES,
  });
  //getting whethere the user is going to or from the university
  const { isDeparting } = JSON.parse(localStorage.getItem("filter"));
  //map reference to control it later
  const mapRef = useRef();
  //on load function to set the map reference
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  //setting the center of the map
  const center = getCenter(home);
  //if user share his location we set is as home location
  const setCurrentHomeLocation = (position) => {
    setHome((prev) => ({
      lng: position?.coords?.longitude,
      lat: position?.coords?.latitude,
    }));

    console.log(
      "Latitude: " +
        position?.coords?.latitude +
        "Longitude: " +
        position?.coords?.longitude
    );
  };
  //calling of the function to get the current location on mount, and alerting any errors if any
  useEffect(() => {
    getLocation(setCurrentHomeLocation, showError);
  }, []);
  //displaying directions based on the home changing state and after loading
  useEffect(() => {
    onLoad(mapRef.current, home);
    withDirection &&
      fetchDirections(home, isLoaded, isDeparting, university, setDirections);
  }, [home, isLoaded]);
  //scroll to bottom to fill the map
  useEffect(() => {
    scrollToBottom(withDirection);
  }, [isLoaded]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLocation(home));
  }, [home]);

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
        onLoad={() => onLoad(mapRef.current)}
      >
        <div className="controls">
          <Places
            setHome={(position) => {
              setHome(position);
              console.log("here");
            }}
          />
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
        <button onClick={() => getLocation(setCurrentHomeLocation, showError)}>
          get current location
        </button>
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

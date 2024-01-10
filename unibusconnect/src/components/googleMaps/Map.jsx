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
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setAddress } from "../../redux/locationSlice";
import { GeoAltFill } from "react-bootstrap-icons";

const MAPS_LIBRARIES = ["places"];

const Map = ({ withDirection, universityLat, universityLng }) => {
  //home and university states for the map
  //home is for the user to set
  //he can share jis current location or choose one by clicking on the map or from the input
  const defaultLocation = useSelector(
    (state) => state?.auth?.user?.defaultLocation
  );
  const currentLocation = useSelector(
    (state) => state?.location.currentLocation
  );
  const currentLocationIsNull =
    currentLocation?.lat === null && currentLocation?.lng === null;
  console.log(currentLocation);
  console.log(defaultLocation);
  const dispatch = useDispatch();
  //const [home, setHome] = useState(defaultLocation);
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
  const isDeparting = JSON.parse(localStorage.getItem("filter"))?.isDeparting;
  //map reference to control it later
  const mapRef = useRef();
  //on load function to set the map reference
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  //setting the center of the map
  const center = getCenter(
    !currentLocationIsNull ? currentLocation : defaultLocation
  );
  //if user share his location we set is as home location
  const shareLocation = (position) => {
    dispatch(
      setLocation({
        lat: position?.coords?.latitude,
        lng: position?.coords?.longitude,
      })
    );
    console.log(
      "Latitude: " +
      position?.coords?.latitude +
      "Longitude: " +
      position?.coords?.longitude
    );
  };
  //get the place name of the current location
  const getCurrentLocationName = useCallback(async (position) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(position?.lat),
      lng: parseFloat(position?.lng),
    };
    await geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const address =
            results[3].address_components[0].long_name +
            ", " +
            results[3].address_components[1].long_name +
            ", " +
            results[3].address_components[2].long_name;
          dispatch(setAddress(address));
          console.log(address);
          return address;
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  });
  useEffect(() => {
    currentLocation && isLoaded && getCurrentLocationName(currentLocation);
  }, [currentLocation, defaultLocation]);

  //calling of the function to get the current location on mount, and alerting any errors if any
  // useEffect(() => {
  //   getLocation(setCurrentHomeLocation, showError);
  // }, []);
  //scroll to bottom to fill the map
  useEffect(() => {
    scrollToBottom(withDirection);
  }, [isLoaded]);
  //displaying directions based on the home changing state and after loading
  useEffect(() => {
    onLoad(
      mapRef.current,
      !currentLocationIsNull ? currentLocation : defaultLocation
    );
    withDirection &&
      fetchDirections(
        !currentLocationIsNull ? currentLocation : defaultLocation,
        isLoaded,
        isDeparting,
        university,
        setDirections
      );
    //return () => dispatch(setLocation({ lat: null, lng: null }));
  }, [currentLocation, defaultLocation, isLoaded]);

  if (!isLoaded) return <div>loading...</div>;

  return (
    <>
      <GoogleMap
        zoom={15}
        onClick={(e) => {
          console.log(e);
          console.log(
            getCurrentLocationName({
              lat: e?.latLng?.lat(),
              lng: e?.latLng?.lng(),
            })
          );
          dispatch(
            setLocation({
              lat: e?.latLng?.lat(),
              lng: e?.latLng?.lng(),
              // address: getCurrentLocationName({
              //   lat: e?.latLng?.lat(),
              //   lng: e?.latLng?.lng(),
              // }),
            })
          );
        }}
        center={center}
        options={{ disableDefaultUI: true }}
        mapContainerClassName="map-container"
        onLoad={() => onLoad(mapRef.current)}
      >
        <div className="controls">
          <Places
            setHome={(position) => {
              dispatch(setLocation(position));
            }}
          />
          <button className="locationNowButton" onClick={() => getLocation(shareLocation, showError)}>
            <GeoAltFill size={20} />
          </button>
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
        {(!currentLocationIsNull ||
          (defaultLocation?.lat !== null && defaultLocation.lng !== null)) && (
            <Marker position={center}></Marker>
          )}
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

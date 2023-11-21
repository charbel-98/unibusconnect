import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
const center = { lat: 34.3963159, lng: 35.89584450000007 };
const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDlXmTnz1ntfdhkloeT7HZ2jtJ0fWQPgos",
  });
  if (!isLoaded) return <div>loading...</div>;
  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      <Marker position={center}></Marker>
    </GoogleMap>
  );
};

export default Map;

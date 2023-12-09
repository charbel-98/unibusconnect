import Map from "../googleMaps/Map";
function Pickup({ universityLocation: { lat, lng } }) {
  return <Map universityLat={lat} universityLng={lng} withDirection={true} />;
}
export default Pickup;

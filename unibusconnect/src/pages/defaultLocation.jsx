import Map from "../components/googleMaps/Map.jsx";

export default function DefaultLocation() {
  return (
    <>
      <Map withDirection={false} />
      <div className="fixed-bottom view-seatbt p-3">
        <button
          //onClick={reserve}
          className="btn btn-danger btn-block osahanbus-btn rounded-1"
        >
          Set Your Default Location
        </button>
      </div>
    </>
  );
}

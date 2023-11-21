function JourneyInfo({ time, AC, status, busnb }) {
  return (
    <div className="bg-white p-3">
      <div className="row mx-0 mb-3">
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">Bus</small>
          <p className="small mb-0 l-hght-14">{busnb}</p>
        </div>
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">{time[0]}</small>
          <p className="small mb-0 l-hght-14">{time[1]}</p>
        </div>
      </div>
      <div className="row mx-0 mb-3">
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">Boarding Point</small>
          <p className="small mb-0 l-hght-14"> to be set</p>
        </div>
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">AC</small>
          <p className="small mb-0 l-hght-14">Ac is {!AC && "not"} available</p>
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">Status</small>
          <p className="small mb-0 l-hght-14">{status}</p>
        </div>
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">Price</small>
          <p className="small mb-0 l-hght-14">1$</p>
        </div>
      </div>
    </div>
  );
}
export default JourneyInfo;

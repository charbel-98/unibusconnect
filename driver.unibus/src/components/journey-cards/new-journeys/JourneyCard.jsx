import React from "react";

const JourneyCard = ({
  highlighted,
  muted,
  driver,
  departingPassengers,
  returningPassengers,
  bus,
  departureTime,
  arrivalTime,
  busSeats,
}) => {
  return (
    <div
      className={`journey-card card-selected
    ${highlighted && "card-selected"}
    ${muted && "card-muted"}
    `}
    >
      {/* card header */}
      <div className="journey-card-header border-bottom p-1">
        <span>
          {arrivalTime} - {departureTime}
        </span>
      </div>
      {/* card body */}
      <div className="d-flex flex-wrap align-content-center p-1 border-bottom gap-2">
        <div className="d-flex flex-column bg-light p-1 gap-1 mini-card">
          <span className="p-1">Passengers</span>
          <span className="ms-auto p-1">
            {departingPassengers} / {busSeats}
          </span>
        </div>
        <div className="d-flex flex-column flex-wrap bg-light p-1 gap-1 mini-card">
          <span className="p-1">Driver</span>
          <span className="ms-auto p-1">{driver}</span>
        </div>
      </div>
      {/* card footer */}
      <div className="d-flex justify-content-end gap-1 p-1">
        <button className="btn btn-primary">View details</button>
        <button className="btn btn-danger" disabled={highlighted || muted}>
          Take
        </button>
      </div>
    </div>
  );
};

export default JourneyCard;

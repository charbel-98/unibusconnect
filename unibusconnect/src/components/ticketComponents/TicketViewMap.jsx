import React from "react";
import { GeoAltFill } from "react-bootstrap-icons";

const TicketViewMap = () => {
  return (
    <div className="list_item d-flex col-12 m-0 p-3 bg-white shadow-sm rounded-1 shadow-sm mb-3">
      <div className="d-flex mb-auto">
        <GeoAltFill className="icofont-location-pin h4"></GeoAltFill>
      </div>
      <div className="d-flex w-100">
        <div className="bus_details w-100 ps-3">
          <p className="mb-2 l-hght-18 fw-bold">
            View Boarding Location on Map
          </p>
          <div className="d-flex align-items-center mt-2">
            <small className="text-muted mb-0 ps-1">
              Akshya Nagar 1st Block 1st Cross, Rammurthy
              <br />
              Nagar, Bangalore <br />
              560016
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketViewMap;

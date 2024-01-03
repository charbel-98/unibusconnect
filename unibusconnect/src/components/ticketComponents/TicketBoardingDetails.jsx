import React from "react";

const TicketBoardingDetails = ({ from, to }) => {
  return (
    <div className="bg-white rounded-1 shadow-sm p-3 mb-3 w-100">
      <div className="row mx-0">
        <div className="col-12 p-0 mb-3">
          <small className="text-danger mb-1 f-10 pr-1">PICKUP FROM</small>
          <p className="small mb-0 l-hght-14">{from}</p>
        </div>
        <div className="col-12 p-0">
          <small className="text-danger mb-1 f-10 pr-1">DROPPING AT</small>
          <p className="small mb-0 l-hght-14">{to}</p>
        </div>
      </div>
    </div>
  );
};

export default TicketBoardingDetails;

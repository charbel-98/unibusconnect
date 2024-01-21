import React from "react";

const TicketHeader = ({ date, from, to }) => {
  const splitFromAddress = from?.split(",");
  const splitToAddress = to?.split(",");
  const fromContent =
    splitFromAddress?.length > 1 && splitFromAddress[1]
      ? splitFromAddress[1]
      : from;
  const toContent =
    splitToAddress?.length > 1 && splitToAddress[1] ? splitToAddress[1] : to;
  return (
    <div className="bg-white border border-warning rounded-1 shadow-sm p-3 mb-3">
      <div className="row mx-0 mb-3">
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 ps-1">GOING FROM</small>
          <p className="small mb-0 l-hght-14"> {fromContent}</p>
        </div>
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 ps-1">GOING TO </small>
          <p className="small mb-0 l-hght-14"> {toContent}</p>
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 ps-1">DATE OF JOURNEY</small>
          <p className="small mb-0 l-hght-14"> {date?.split("T")[0]}</p>
        </div>
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 ps-1">YOU RATED</small>
          <p className="small mb-0 l-hght-14">
            <span className="icofont-star text-warning"></span> 3.5
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketHeader;

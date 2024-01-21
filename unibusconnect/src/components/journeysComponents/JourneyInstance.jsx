import {
  StarFill,
  CloudFog2Fill,
  BusFrontFill,
  Clock,
  GeoAltFill,
  ClockFill,
  Check,
  CheckCircleFill,
} from "react-bootstrap-icons";

import Rating from "../../UI/Rating";
import { nb } from "date-fns/locale";
import ST from "../../img/ST.png";
import { Link } from "react-router-dom";
function JourneyInstance({
  img,
  from,
  to,
  rating,
  nbPassengers,
  status,
  nbSeats,
  date,
  time,
  providerName,
  id,
}) {
  const formetedDate = new Date(date).toLocaleDateString("en-us", {
    month: "long",
    day: "numeric",
  });
  const statusColor =
    status === "Pending"
      ? "warning"
      : status === "Confirmed"
      ? "success"
      : "danger";
  return (
    <Link to={`/journeys/${id}`} className="text-dark col-6 px-0 " key={id}>
      <div className="list_item_gird m-0 bg-white shadow-sm listing-item border-bottom border-right">
        <div className="px-3 pt-3 tic-div">
          <div className="list-item-img">
            <img src={ST} className="img-fluid img-shadow" />
          </div>
          <p className="mb-0 l-hght-10">{providerName}</p>
          <span className="text-danger small">
            {from} to {to}
          </span>
          {/* <Rating></Rating> */}
        </div>
        <div className="p-3 d-flex">
          <div className="bus_details w-100">
            <div className="d-flex">
              <p>
                <CloudFog2Fill className="me-2 text-danger" />
                <span className="small">AC</span>
              </p>
              <p className="small ms-auto">
                <BusFrontFill className="me-2 text-danger" /> {nbPassengers} /{" "}
                {nbSeats}
              </p>
            </div>
            <div className="d-flex l-hght-10">
              <Clock className="small me-2 text-danger" />
              <div>
                <small className="text-muted mb-2 d-block">
                  {time && time[0]}
                </small>
                <p className="small">{`${formetedDate},
                 ${time && time[1]}`}</p>
              </div>
            </div>
            <div className="d-flex l-hght-10">
              <GeoAltFill className="small me-2 text-danger" />
              <div>
                <small className="text-muted mb-2 d-block">From - To</small>
                <p className="small mb-1">
                  {from} to {to}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`status-element border border-2 border-${statusColor} mx-5 rounded-5 d-flex justify-content-center mb-3`}
        >
          {status === "Pending" ? (
            <ClockFill className={`text-${statusColor} me-1`} />
          ) : (
            <CheckCircleFill className={`text-${statusColor} me-1`} />
          )}
          <span className={`text-${statusColor}`}>{status}</span>
        </div>
      </div>
    </Link>
  );
}
export default JourneyInstance;

//!still have to add 404 handling and error handling

import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import TicketsSkeleton from "../UI/skeleton-components/TicketsSkeleton";

export function Ticket({
  date,
  status,
  SP,
  isDeparting,
  time,
  path,
  from,
  to,
  journeyId,
  isFuture,
}) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const cancelHandler = async () => {
    try {
      const response = await axiosPrivate.get(
        `/cancelreservation/${journeyId}`
      );
      console.log(response.data);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className="bg-white text-black rounded-1 shadow-sm p-3 mb-3 w-100"
      // onClick={() => navigate()}
    >
      <Link to={path} className="d-flex align-items-center mb-2">
        <small className="text-muted">A/C Sleeper (2+1)</small>
        <small className="text-success ms-auto f-10">{status}</small>
      </Link>
      <h6 className="mb-3 l-hght-18 fw-bold text-dark">{SP}</h6>

      <div className="row mx-0 mb-3">
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">GOING FROM</small>
          <p className="small mb-0 l-hght-14">{from}</p>
        </div>
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">TO</small>
          <p className="small mb-0 l-hght-14">{to}</p>
        </div>
      </div>
      <div className="row mx-0">
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">DATE OF JOURNEY</small>
          <p className="small mb-0 l-hght-14">{date.split("T")[0]}</p>
        </div>
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">
            {isDeparting ? "Arriving Time" : "Departure Time"}
          </small>
          <p className="small mb-0 l-hght-14">
            {" "}
            <div className="text-success fw-bold">{time}</div>
          </p>
        </div>
      </div>
      {isFuture && (
        <div className="row w-100 mt-4">
          <button
            className="btn btn-danger w-25 ms-auto"
            onClick={cancelHandler}
          >
            CANCEL
          </button>
        </div>
      )}
    </div>
  );
}

const Tickets = () => {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    const getTickets = async () => {
      try {
        const response = await axiosPrivate.get("/tickets", {
          params: {
            type: "ticket",
          },
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setTickets(response.data.tickets);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response?.status == 403) {
          navigate("/login", { state: { from: location }, replace: true });
        }
        setIsLoading(false);
      }
    };
    getTickets();

    return () => {
      isMounted = false;
      setIsLoading(false);
      controller.abort();
    };
  }, []);
  return (
    <>
      <div className="your-ticket border-top row m-0 p-3">
        {isLoading && <TicketsSkeleton cards={3} />}
        {(tickets.length > 0 &&
          !isLoading &&
          tickets.map((ticket, i) => {
            return (
              <Ticket
                key={i}
                status={ticket.status}
                SP={ticket.serviceProvider.businessName}
                date={ticket.date}
                isDeparting={ticket.isDeparting}
                time={ticket.time}
                from={ticket.from}
                to={ticket.to}
                path={`/tickets/${ticket.journeyID}`}
                journeyId={ticket.journeyID}
                isFuture={true}
              />
            );
          })) ||
          (!isLoading && (
            <div className="text-center w-100">
              {" "}
              <h5 className="small text-muted">No Tickets Found !</h5>
            </div>
          ))}
      </div>
    </>
  );
};
export default Tickets;

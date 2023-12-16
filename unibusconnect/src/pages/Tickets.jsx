import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";

function Ticket({ date, status, SP, isDeparting, time }) {
  return (
    <div className="bg-white rounded-1 shadow-sm p-3 mb-3 w-100">
      <a href="your-ticket.html">
        <div className="d-flex align-items-center mb-2">
          <small className="text-muted">A/C Sleeper (2+1)</small>
          <small className="text-success ms-auto f-10">{status}</small>
        </div>
        <h6 className="mb-3 l-hght-18 fw-bold text-dark">{SP}</h6>
      </a>
      <div className="row mx-0 mb-3">
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">GOING FROM</small>
          <p className="small mb-0 l-hght-14"> LUDHIANA</p>
        </div>
        <div className="col-6 p-0">
          <small className="text-muted mb-1 f-10 pe-1">TO</small>
          <p className="small mb-0 l-hght-14"> GOA</p>
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
            <a className="text-success fw-bold" href="customer-feedback.html">
              {time}
            </a>
          </p>
        </div>
      </div>
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
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setTickets(response.data.tickets);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
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
    <div className="your-ticket border-top row m-0 p-3">
      {tickets.map((ticket, i) => {
        return (
          <Ticket
            key={i}
            status={ticket.status}
            SP={ticket.serviceProvider.businessName}
            date={ticket.date}
            isDeparting={ticket.isDeparting}
            time={ticket.time}
          />
        );
      })}
    </div>
  );
};
export default Tickets;

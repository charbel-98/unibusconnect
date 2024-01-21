//!still have to add 404 handling and error handling
import React from "react";
import { SelectSeat } from "../UI/SelectSeat";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { Ticket } from "./Tickets";
const History = () => {
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
          params: { history: true },
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
            path={`/reports/lost-item/${ticket.journeyID}`}
            from={ticket.from}
            to={ticket.to}
          />
        );
      })}
    </div>
  );
};

export default History;

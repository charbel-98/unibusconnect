import React from "react";
import { SelectSeat } from "../UI/SelectSeat";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { Ticket } from "./Tickets";
import TicketHeader from "../components/ticketComponents/TicketHeader";
import TicketBoardingDetails from "../components/ticketComponents/TicketBoardingDetails";
const LostItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [journey, setJourney] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    const getJourney = async () => {
      try {
        const response = await axiosPrivate.get(`/journeys/${id}`, {
          params: {
            id,
          },
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setJourney(response.data.journey);
        setIsLoading(false);
      } catch (err) {
        if (err.response?.status == 403) {
          console.error(err, err.response);
          navigate("/login", { state: { from: location }, replace: true });
        }
        setIsLoading(false);
      }
    };
    getJourney();

    // getInputData();

    return () => {
      isMounted = false;
      setIsLoading(false);
      controller.abort();
    };
  }, []);
  return (
    <div className="p-3">
      <h5 class="mb-3 font-weight-bold text-dark">
        MANDI Travellers ISO 9002- 2009 Certified
      </h5>
      <p class="text-success mb-3 font-weight-bold">COMPLETED</p>
      <TicketHeader />
      <TicketBoardingDetails />
      <h5 class=" mb-3 font-weight-bold">Select your seat</h5>
      <SelectSeat />
    </div>
  );
};

export default LostItem;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import TicketHeader from "../components/ticketComponents/TicketHeader";
import TicketBoardingDetails from "../components/ticketComponents/TicketBoardingDetails";
import { useParams } from "react-router-dom";
import TicketViewMap from "../components/ticketComponents/TicketViewMap";
import Map from "../components/googleMaps/Map";
const TicketDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [journey, setJourney] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    const getJourney = async () => {
      try {
        const response = await axiosPrivate.get(`/journeys/${id}`, {
          params: {
            id,
            type: "ticket",
          },
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setJourney(response.data);
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
      <h5 className="mb-3 fw-bold text-dark">{journey?.provider}</h5>
      <p className={`text-${"success"} mb-3 fw-bold`}>{journey?.status}</p>
      <TicketHeader
        date={journey?.date}
        from={journey?.departure}
        to={journey?.destination}
      />
      <TicketBoardingDetails
        from={journey?.departure}
        to={journey?.destination}
      />
      <TicketViewMap
        onClick={() => {
          setShowMap(!showMap);
        }}
      />
      {showMap && <Map defaultLatLng={journey.departureLatLng} />}
    </div>
  );
};

export default TicketDetails;

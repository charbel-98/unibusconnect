import React from "react";
import FromToTextBox from "../components/journeysComponents/FromToTextBox";
import JourneyInstance from "../components/journeysComponents/JourneyInstance";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
export const Journeys = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [journeys, setJourneys] = useState([]);
  //getting filter from local storage which was set in the home page
  const storedFilter = localStorage.getItem("filter");
  const navigate = useNavigate();
  const { from, to, date, isDeparting } = JSON.parse(storedFilter);
  const location = useLocation();
  console.log(from, to, date);
  //requesting the journeys data from the server
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    const getJourneys = async () => {
      try {
        const response = await axiosPrivate.get("/journeys", {
          params: {
            from,
            to,
            date,
          },
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setJourneys(response.data.journeys);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
        setIsLoading(false);
      }
    };
    getJourneys();

    return () => {
      isMounted = false;
      setIsLoading(false);
      controller.abort();
    };
  }, [from, to, date]);

  return (
    <div className="osahan-listing p-0 m-0 row border-top">
      <FromToTextBox from={from} to={to}></FromToTextBox>
      {/* {load the journey for going to university ot coming back based on the existance of the from in the cities array} */}
      {!isLoading &&
        journeys?.map((journey) => {
          return (
            <JourneyInstance
              nbPassengers={
                isDeparting
                  ? journey.departingPassengers.length
                  : journey.returningPassengers.length
              }
              nbSeats={journey.bus.numberOfSeats}
              from={from}
              to={to}
              rating={4}
              date={journey.date}
              time={
                isDeparting
                  ? ["Arriving Time", journey.arrivalTimeToUniversity]
                  : ["Departing Time", journey.departureTimeFromUniversity]
              }
              status={journey.status}
              providerName={journey.serviceProvider.businessName}
              id={journey._id}
            ></JourneyInstance>
          );
        })}
    </div>
  );
};

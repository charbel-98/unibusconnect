import React from "react";
import FromToTextBox from "../components/journeysComponents/FromToTextBox";
import JourneyInstance from "../components/journeysComponents/JourneyInstance";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export const Journeys = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [journeys, setJourneys] = useState([]);
  const storedFilter = localStorage.getItem("filter");

  const { from, to, date } = JSON.parse(storedFilter);

  console.log(from, to, date);
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

    // getInputData();

    return () => {
      isMounted = false;
      setIsLoading(false);
      controller.abort();
    };
  }, [from, to, date]);

  return (
    <div className="osahan-listing p-0 m-0 row border-top">
      <FromToTextBox from={from} to={to}></FromToTextBox>

      {!isLoading &&
        journeys?.map((journey) => {
          console.log(journey.serviceProvider.region.cities.includes(from));
          return (
            <JourneyInstance
              nbPassengers={
                journey?.serviceProvider?.region.cities?.includes(from)
                  ? journey.departingPassengers.length
                  : journey.returningPassengers.length
              }
              nbSeats={journey.bus.numberOfSeats}
              from={from}
              to={to}
              rating={4}
              date={journey.date}
              time={
                journey?.serviceProvider?.region?.cities?.includes(from)
                  ? ["Arriving Time", journey.arrivalTimeToUniversity]
                  : journey?.serviceProvider?.region?.universities?.includes(
                      from
                    )
                  ? ["Departing Time", journey.departureTimeFromUniversity]
                  : []
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

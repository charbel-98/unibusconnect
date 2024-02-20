import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import JourneyCard from "../components/journey-cards/new-journeys/JourneyCard";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const [journeys, setJourneys] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const driverID = useAuth();
  useEffect(() => {
    const abortController = new AbortController();
    axiosPrivate
      .get("/journeys", {
        params: {
          date: new Date("2024-02-12").toISOString(),
        },
        signal: abortController.signal,
      })
      .then((res) => {
        setJourneys(res.data.journeys);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          redirect("http:localhost:5173/login");
        }
      });
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className="d-flex flex-column w-100">
      {/* header */}
      {/* <div className="d-flex justify-content-center align-content-center p-2 border-bottom bg-danger text-white">
        <h3>Journeys</h3>
      </div> */}
      {/* header */}
      <div className="d-flex justify-content-between align-content-center p-2 border bg-danger-subtle">
        <button className="btn btn-secondary" disabled>
          ◀
        </button>
        <h4 className="d-flex justify-content-center m-auto">Today</h4>
        <button className="btn btn-secondary">▶</button>
      </div>

      {/* cards (data) */}
      <div className="journey-container p-1 border">
        {journeys &&
          journeys?.map((journey) => (
            <JourneyCard
              key={journey._id}
              driver={journey?.driver?.name || "N/A"}
              departingPassengers={journey.departingPassengers}
              returningPassengers={journey.returningPassengers}
              bus={journey.bus}
              departureTime={journey.departingFromUniversity}
              arrivalTime={journey.arrivingToUniversity}
              busSeats={journey.busSeats}
              highlighted={journey?.driver === driverID}
              muted={journey.driver && journey?.driver !== driverID}
            />
          ))}
        {/* card */}
      </div>
    </div>
  );
};
export default Home;

import React from "react";
import { SelectSeat } from "../UI/SelectSeat";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect, useRef } from "react";
import TicketHeader from "../components/ticketComponents/TicketHeader";
import TicketBoardingDetails from "../components/ticketComponents/TicketBoardingDetails";
import { useParams } from "react-router-dom";
import TicketViewMap from "../components/ticketComponents/TicketViewMap";
import Map from "../components/googleMaps/Map";
import createNotification from "../utils/createNotification";
const LostItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [journey, setJourney] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  // let ref = useRef(null);
  // console.log("ref", ref.current.value);
  async function submitForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.type = "lost-item";
    data.id = id;
    if (!data.seat)
      return createNotification({
        type: "error",
        message: "Please select a seat",
      });
    console.log(data);
    try {
      const response = await axiosPrivate.post("/reports/new", data);
      console.log(response.data);
      createNotification({
        type: "report",
        message: response.data.message,
      });
      e.target.reset();
      navigate("/");
    } catch (err) {
      if (err.response?.status == 403) {
        console.error(err, err.response);
        return navigate("/login", { state: { from: location }, replace: true });
      }
      createNotification({
        type: "error",
        message: err.response.data?.message || "Something went wrong",
      });
    }
  }
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
    <form className="p-3" onSubmit={submitForm}>
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
        isHistory={true}
      />
      <h5 className="mb-3 fw-bold">Enter your report message:</h5>
      <textarea name="message" id="report-message" rows="4" required></textarea>
      <h5 className="mb-3 fw-bold">Select your seat</h5>
      <SelectSeat />

      <p>
        <button
          type="submit"
          className="btn btn-danger btn-block osahanbus-btn rounded-1"
        >
          {" "}
          Submit{" "}
        </button>
      </p>
    </form>
  );
};

export default LostItem;

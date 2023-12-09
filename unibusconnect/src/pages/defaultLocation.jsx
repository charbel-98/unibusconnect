import { useSelector } from "react-redux";
import Map from "../components/googleMaps/Map.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function DefaultLocation() {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestPending, setIsRequestPending] = useState(false); // New state
  const userId = useSelector((state) => state?.auth?.user?.id);
  const { currentLocation } = useSelector((state) => state?.location);
  console.log(currentLocation);
  const navigate = useNavigate();

  const setDefaultLocation = async () => {
    try {
      if (isRequestPending) {
        // If a request is already pending, ignore the new click
        return;
      }

      setIsRequestPending(true); // Set the request status to pending

      const response = await axiosPrivate.post(`/setdefaultlocation`, {
        defaultLocation: currentLocation,
        userId,
      });

      console.log(response.data);
      navigate("/", { replace: true });
    } catch (err) {
      // Handle errors
      console.log(err.response?.data?.message);

      if (err.response?.status === 403) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    } finally {
      setIsRequestPending(false); // Reset the request status whether successful or not
      setIsLoading(false);
    }
  };

  return (
    <>
      <Map withDirection={false} />
      <div className="fixed-bottom view-seatbt p-3">
        <button
          onClick={setDefaultLocation}
          className="btn btn-danger btn-block osahanbus-btn rounded-1"
          disabled={isRequestPending} // Disable the button while a request is pending
        >
          {isRequestPending ? "Setting..." : "Set Your Default Location"}
        </button>
      </div>
    </>
  );
}

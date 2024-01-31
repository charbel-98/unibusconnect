import { useSelector, useDispatch } from "react-redux";
import Map from "../components/googleMaps/Map.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setDefaultLocation } from "../redux/auth/authSlice";
import { setAddress, setLocation } from "../redux/locationSlice.js";
export default function DefaultLocation() {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestPending, setIsRequestPending] = useState(false); // New state
  const userId = useSelector((state) => state?.auth?.user?.id);
  const { currentLocation, address } = useSelector((state) => state?.location);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(currentLocation, address);
  const setDefaultLocationCallback = useCallback(async () => {
    try {
      if (isRequestPending) {
        return;
      }

      setIsRequestPending(true);
      if (currentLocation) {
        const response = await axiosPrivate.post(`/setdefaultlocation`, {
          defaultLocation: currentLocation,
          defaultAddress: address,
          userId,
        });
        dispatch(
          setDefaultLocation({
            location: response.data.defaultLocation,
            defaultAddress: response.data.defaultAddress,
          })
        );
        console.log(response.data);
        navigate("/", { replace: true });
      } else {
        alert("Please set your location first");
      }
    } catch (err) {
      console.log(err.response?.data?.message);

      if (err.response?.status === 403) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    } finally {
      setIsRequestPending(false);
      setIsLoading(false);
    }
  }, [
    isRequestPending,
    currentLocation,
    dispatch,
    navigate,
    axiosPrivate,
    userId,
  ]);

  useEffect(() => {
    return () => {
      dispatch(setLocation({ lat: null, lng: null }));
      dispatch(setAddress(null));
    };
  }, [dispatch]);
  return (
    <>
      <Map
        withDirection={false}
        setDefaultLocationCallback={setDefaultLocationCallback}
        isRequestPending={isRequestPending}
      ></Map>
    </>
  );
}

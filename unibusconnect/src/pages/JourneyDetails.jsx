import JourneyHeader from "../components/journeyDetailsComponents/JourneyHeader";
import ActionButtons from "../components/journeyDetailsComponents/ActionButtons";
import JourneyInfo from "../components/journeyDetailsComponents/JourneyInfo";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Info from "../components/journeyDetailsComponents/Info";
import Review from "../components/journeyDetailsComponents/Review";
import Pickup from "../components/journeyDetailsComponents/Pickup";
import Modal from "../UI/Modal.jsx";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { modal_Data } from "../UI/modalData";
import JourneyDetailsSkeleton from "../UI/skeleton-components/JourneyDetailsSkeleton.jsx";
const JourneyDetails = () => {
  const [active, setActive] = useState({
    info: true,
    review: false,
    pickup: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [isRequestPending, setIsRequestPending] = useState(false); // New state

  const { currentLocation, address } = useSelector((state) => state?.location);
  const { defaultLocation, defaultAddress } = useSelector(
    (state) => state?.auth?.user
  );
  const [ModalData, setModalData] = useState(null);
  const modalData = modal_Data(
    setActive,
    setShowModal,
    currentLocation,
    defaultLocation,
    defaultAddress,
    reserve,
    setModalData
  );
  const currentLocationIsNull = !currentLocation?.lat && !currentLocation?.lng;
  const defaultLocationIsNull = !defaultLocation?.lat && !defaultLocation?.lng;
  const { id } = useParams();
  const [journey, setJourney] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, date, isDeparting } = JSON.parse(
    localStorage.getItem("filter")
  );

  const activeButtonhandler = (e) => {
    setActive((prev) => {
      console.log([e.target.id]);
      return { info: false, review: false, pickup: false, [e.target.id]: true };
    });
  };
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
  const universityAddress = isDeparting ? to : from;
  const universityObject = journey?.serviceProvider?.region?.universities.find(
    (university) => university[universityAddress]
  );

  const university_Lat_Lng = universityObject
    ? universityObject[universityAddress]
    : null;
  async function reserve(userLocation, userAddress) {
    try {
      if (isRequestPending) {
        return;
      }
      setIsRequestPending(true);
      const response = await axiosPrivate.post(`/reservation/register/${id}`, {
        isDeparting,
        userLocation,
        userAddress,
        universityLocation: university_Lat_Lng,
        universityAddress,
      });
      console.log(response.data);
    } catch (err) {
      // will be edited later
      alert(err.response.data.message);
      if (err.response.status == 403) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    } finally {
      setIsRequestPending(false);
      setIsLoading(false);
    }
  }

  const Modalfunction = () => {
    console.log(defaultLocation);
    if (defaultLocationIsNull && currentLocationIsNull) {
      setModalData(modalData.noLocation);
      setShowModal(true);
    } else if (currentLocationIsNull && !defaultLocationIsNull) {
      setModalData(modalData.noCurrentLocationWithDefaultLocation);
      setShowModal(true);
    }
    if (!currentLocationIsNull && !defaultLocationIsNull) {
      setModalData(modalData.withCurrentLocationAndDefaultLocation);
      setShowModal(true);
    }
    if (defaultLocationIsNull && !currentLocationIsNull) {
      reserve(currentLocation, address);

      setModalData(modalData.setCurrentLocationAsDefault);
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && (
        <Modal title={ModalData.title} description={ModalData.description}>
          {ModalData.buttons &&
            ModalData.buttons.map((b, i) => {
              return (
                <button
                  key={i}
                  className={b.class}
                  onClick={b.function || null}
                >
                  {" "}
                  {b.text}{" "}
                </button>
              );
            })}
        </Modal>
      )}
      {isLoading && <JourneyDetailsSkeleton />}
      {!isLoading && (
        <>
          <div className="list_item m-0 bg-white">
            <JourneyHeader
              from={from}
              to={to}
              sp={journey?.serviceProvider?.businessName}
            />
            <JourneyInfo
              time={
                isDeparting
                  ? ["Arriving Time", journey.arrivalTimeToUniversity]
                  : ["Departing Time", journey.departureTimeFromUniversity]
              }
              AC={journey?.bus?.AC}
              status={journey?.status}
              busnb={journey?.bus?.busnb}
            />
            <ActionButtons
              activeButton={active}
              onClick={activeButtonhandler}
            ></ActionButtons>
            <div className="tab-content" id="pills-tabContent">
              {active.info && (
                <Info sp={journey?.serviceProvider?.businessName}></Info>
              )}
              {active.review && <Review></Review>}
              {active.pickup && (
                <Pickup universityLocation={university_Lat_Lng}></Pickup>
              )}
            </div>
          </div>

          <div className="fixed-bottom view-seatbt p-3">
            <button
              onClick={Modalfunction}
              className="btn btn-danger btn-block osahanbus-btn rounded-1"
            >
              {isRequestPending ? "Reserving..." : "Book Your Seats Now"}
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default JourneyDetails;

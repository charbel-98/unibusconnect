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
const JourneyDetails = () => {
  const [active, setActive] = useState({
    info: true,
    review: false,
    pickup: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ModalData, setModalData] = useState({
    title: "Warning",
    description: "You need to set your location before continue.",
    buttons: [
      {
        text: "set my location",
        class: "btn bg-danger",
        function: () => {
          setActive({
            info: false, review: false, pickup: true
          })
          setShowModal(false);
        }
      }
    ]
  })
  const { id } = useParams();
  const [journey, setJourney] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to, date, isDeparting } = JSON.parse(
    localStorage.getItem("filter")
  );
  const defaultLocation = useSelector(
    (state) => state?.auth?.user?.defaultLocation
  );
  const currentLocation = useSelector(
    (state) => state?.location
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
  
  const Modalfunction = () => {
    console.log(defaultLocation)
    if (!defaultLocation.lat || !defaultLocation.lng) {
      return setShowModal(true);
    } else {
      let Data = {
        title: "Confirmation",
        description: "You already have deafult location, you need to use it ?\ or choose another location for this journey.",
        buttons: [
          {
            text: "get the default",
            class: "btn bg-secondary",
            function: () => {
              setShowModal(false);
              reserve();
            }
          },
          {
            text: "change my location",
            class: "btn bg-danger",
            function: () => {
              setActive({
                info: false, review: false, pickup: true
              })
              setShowModal(false);
            }
          }
        ]
      }
      setModalData(Data);
      setShowModal(true);
    }
  }
  const reserve = async () => {
    try {
      const response = await axiosPrivate.post(`/reservation/register/${id}`, {
        isDeparting,
      });
      console.log(response.data);
    } catch (err) {
      // will be edited later
      alert(err.response.data.message);
      if (err.response.status == 403) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    }
    setIsLoading(false);
  };
  const universityName = isDeparting ? to : from;
  const universityObject = journey?.serviceProvider?.region?.universities.find(
    (university) => university[universityName]
  );

  const university_Lat_Lng = universityObject
    ? universityObject[universityName]
    : null;
  console.log(university_Lat_Lng);

  return (
    <>
      {showModal && (
        <Modal title={ModalData.title} description={ModalData.description}>
          {ModalData.buttons && ModalData.buttons.map(b => {
            return (<button className={b.class} onClick={b.function || null} > {b.text} </button>)
          })}
        </Modal>
      )}
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
          Book Your Seats Now
        </button>
      </div>
    </>
  );
};
export default JourneyDetails;

import { LocalizationProvider } from "@mui/x-date-pickers";
import SelectCity from "../components/homeComponents/SelectCity";
import SelectUniversity from "../components/homeComponents/SelectUniversity";
import Ad from "../components/homeComponents/Ad";
import hygeneImg from "../img/hygene.svg";
import customerSupportImg from "../img/customer-support.svg";
import liveTrackingImg from "../img/live-tracking.svg";
import verifiedDriversImg from "../img/verified-drivers.svg";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setIsDeparting } from "../redux/filterSlice";
// this is a home pge component
const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [cities, setCities] = useState(null);
  const [universities, setUniversities] = useState(null);
  const [homeToUni, setHomeToUni] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  if (
    localStorage.getItem("cities") &&
    localStorage.getItem("universities") &&
    !cities &&
    !universities
  ) {
    setCities(JSON.parse(localStorage.getItem("cities")));
    setUniversities(JSON.parse(localStorage.getItem("universities")));
  }
  //getting from to data from server
  useEffect(() => {
    if (!cities || !universities) {
      let isMounted = true;
      const controller = new AbortController();
      setIsLoading(true);
      const getInputData = async () => {
        try {
          const response = await axiosPrivate.get("/regions/supported", {
            signal: controller.signal,
          });
          isMounted && setCities(response.data.cities);
          isMounted && setUniversities(response.data.universities);
          localStorage.setItem("cities", JSON.stringify(response.data.cities));
          localStorage.setItem(
            "universities",
            JSON.stringify(response.data.universities)
          );
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
          setIsLoading(false);
        }
      };

      getInputData();

      return () => {
        isMounted = false;
        controller.abort();
      };
    }
  }, [cities, universities]);
  //seting the date state
  const dateChangeHandler = (date) => {
    setSelectedDate(date);
    dispatch(setDate(new Date(date).toLocaleString()));
    console.log(date);
    setValid(true);
  };
  //search button handler
  const filter = useSelector((state) => state.filter);
  const journeysSearchHandler = (e) => {
    e.preventDefault();
    if (!filter.from || !filter.to || !filter.date) {
      setValid(false);
      return;
    }
    dispatch(setIsDeparting(homeToUni));
    console.log(filter);
    localStorage.setItem("filter", JSON.stringify(filter));
    navigate("/journeys");
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="osahan-verification padding-bt ">
        <div className="bg-danger px-3 pb-3">
          <div className="bg-white rounded-1 p-3">
            <form onSubmit={journeysSearchHandler}>
              {!valid && (
                <p className="is-invalid text-danger fw-3 text-center">
                  Please pick you departure, destination and date
                </p>
              )}
              <SelectCity
                loading={isLoading}
                cities={cities}
                universities={universities}
                setValidation={setValid}
                homeToUni={homeToUni}
                setHomeToUni={setHomeToUni}
              ></SelectCity>
              <SelectUniversity
                loading={isLoading}
                cities={cities}
                universities={universities}
                setValidation={setValid}
                homeToUni={homeToUni}
                setHomeToUni={setHomeToUni}
              ></SelectUniversity>
              <DatePicker
                className="my-3 w-100"
                label="Pick a Date"
                slotProps={{ textField: { variant: "outlined" } }}
                InputProps={{
                  sx: { "& .MuiSvgIcon-root": { color: "orange" } },
                }}
                shouldDisableDate={(date) => {
                  const day = date.getDay();
                  return day === 0 || day === 6;
                }}
                value={selectedDate}
                onChange={dateChangeHandler}
              />
              <button
                type="submit"
                className="btn btn-danger btn-block osahanbus-btn rounded-1"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="p-3 bg-warning">
          <div className="row m-0">
            <Ad title={"Safe and Hygenic"} img={hygeneImg}></Ad>
            <Ad title={"Best Customer Support"} img={customerSupportImg} />
            <Ad title={"Live Track your Journey"} img={liveTrackingImg} />
            <Ad
              title={"Verified Drivers and Vehicles"}
              img={verifiedDriversImg}
            />
          </div>
        </div>
        <div className="p-3">
          <h6 className="text-center">Bus Discounts For You</h6>
          <div className="row m-0">
            <div className="col-6 py-1 pr-1 pl-0">
              <a href="listing.html">
                <img
                  className="img-fluid rounded-1 shadow-sm"
                  src="img/offer1.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="col-6 py-1 pl-1 pr-0">
              <a href="listing.html">
                <img
                  className="img-fluid rounded-1 shadow-sm"
                  src="img/offer2.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="col-6 py-1 pr-1 pl-0">
              <a href="listing.html">
                <img
                  className="img-fluid rounded-1 shadow-sm"
                  src="img/offer3.jpg"
                  alt=""
                />
              </a>
            </div>
            <div className="col-6 py-1 pl-1 pr-0">
              <a href="listing.html">
                <img
                  className="img-fluid rounded-1 shadow-sm"
                  src="img/offer4.jpg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};
export default Home;

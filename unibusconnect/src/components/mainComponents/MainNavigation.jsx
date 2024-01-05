import { List, ArrowLeftCircle } from "react-bootstrap-icons";
import logo from "../../img/busLogo.png";
import profilePlaceholder from "../../img/profilePlaceholder.png";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./SideBar";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import AuthHeader from "../authComponents/AuthHeader";
import { open } from "../../redux/sideBarSlice";
function MainNavigation() {
  const user = useSelector((state) => state.auth.user);
  //! getting the pathname to render conditional content in the main navigation based on the path
  const { pathname } = useLocation();

  //! Managing the opening state of the side bar with redux/toolkit
  const { openSideBar } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const sidebar = openSideBar && <SideBar />;
  const authenticationHeader = (pathname === "/login" ||
    pathname === "/signup") && <AuthHeader title={pathname.substring(1)} />;
  const homeLogo = pathname === "/" && (
    <img src={logo} className="img-fluid osahan-nav-logo " />
  );
  const homeProfile = pathname === "/" && (
    <Link to="profile" className="me-3">
      {console.log(user?.avatar)}
      <img
        src={user && user.avatar ? user.avatar : profilePlaceholder}
        className="img-fluid rounded-circle"
      />
    </Link>
  );
  const titles = {
    "/journeys": "Journeys",
    "journeys/": "Journey Details",
    "/notifications": "Notification",
    "/tickets": "Your Bookings",
    "/profile": "Profile",
    "/support": "Support",
    "/default-location": "Default Location",
    "/reports/lost-item": "Report",
    "lost-item/": "Lost Item",
  };
  const journeysAndDetails = ([
    "/journeys",
    "/notifications",
    "/tickets",
    "/support",
    "/profile",
    "/default-location",
    "/reports/lost-item",
  ].includes(pathname) ||
    pathname.startsWith("/journeys/") ||
    pathname.startsWith("/reports/lost-item/")) && (
    <Link className="text-light d-flex me-3" to="..">
      <ArrowLeftCircle className="me-2" size={25}></ArrowLeftCircle>
      {([
        "/journeys",
        "/notifications",
        "/tickets",
        "/support",
        "/profile",
        "/default-location",
        "/reports/lost-item",
      ].includes(pathname) ||
        pathname.startsWith("/journeys/") ||
        pathname.startsWith("/reports/lost-item/")) && (
        <span
          style={{ fontSize: "16px" }}
          className="fw-normal mb-0 text-white "
        >
          {titles[pathname] ||
            titles[`${pathname.split("/")[1]}/`] ||
            titles[`${pathname.split("/")[2]}/`] ||
            ""}
        </span>
      )}
    </Link>
  );
  const defaultLocation = useSelector(
    (state) => state?.auth?.user?.defaultLocation
  );
  //console.log(Object.keys(defaultLocation).length !== 0);
  return (
    <>
      {sidebar}
      {authenticationHeader}
      {([
        "/",
        "/journeys",
        "/notifications",
        "/tickets",
        "/support",
        "/profile",
        "/default-location",
        "/reports/lost-item",
      ].includes(pathname) ||
        pathname.startsWith("/journeys/") ||
        pathname.startsWith("/reports/lost-item/")) && (
        <div className="p-3 shadow bg-danger danger-nav osahan-home-header">
          <div className="fw-normal mb-0 d-flex align-items-center">
            {homeLogo}
            {journeysAndDetails}

            <div className="ms-auto d-flex align-items-center">
              {homeProfile}
              <a
                className={`toggle osahan-toggle h4 m-0 text-white ms-auto hc-nav-trigger hc-nav-1 ${
                  (!defaultLocation?.lat || !defaultLocation?.lng) && "notify"
                }`}
                role="button"
                aria-controls="hc-nav-1"
                onClick={() => dispatch(open())}
              >
                <List size={40} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default MainNavigation;

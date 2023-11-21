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
    <a href="profile.html" className="me-3">
      {console.log(user?.avatar)}
      <img
        src={user && user.avatar ? user.avatar : profilePlaceholder}
        className="img-fluid rounded-circle"
      />
    </a>
  );
  const journeysAndDetails = (pathname === "/journeys" ||
    pathname === "/journeys/details" ||
    pathname === "/notification" ||
    pathname === "/tickets" ||
    pathname === "/support" ||
    pathname === "profile") && (
    <Link className="text-light mr-3" to="..">
      <ArrowLeftCircle className="me-2" size={25}></ArrowLeftCircle>
      {(pathname === "/journeys/details" ||
        pathname === "/notification" ||
        pathname === "/tickets" ||
        pathname === "/support" ||
        pathname === "/profile") && (
        <span
          style={{ fontSize: "16px" }}
          className="fw-normal mb-0 text-white "
        >
          {pathname === "/journeys/details" && "Bus Details"}
          {pathname === "/notification" && "Notification"}
          {pathname === "/tickets" && "Your Bookings"}
          {pathname === "/profile" && "Profile"}
          {pathname === "/support" && "Support"}
        </span>
      )}
    </Link>
  );

  return (
    <>
      {sidebar}
      {authenticationHeader}
      {(pathname === "/" ||
        pathname === "/journeys" ||
        pathname === "/journeys/details" ||
        pathname === "/notification" ||
        pathname === "/tickets" ||
        pathname === "/support" ||
        pathname === "/profile") && (
        <div className="p-3 shadow bg-danger danger-nav osahan-home-header">
          <div className="font-weight-normal mb-0 d-flex align-items-center">
            {homeLogo}
            {journeysAndDetails}

            <div className="ms-auto d-flex align-items-center">
              {homeProfile}
              <a
                className="toggle osahan-toggle h4 m-0 text-white ms-auto hc-nav-trigger hc-nav-1"
                href="#"
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

import { Outlet, useLocation } from "react-router-dom";
import MainNavigation from "../components/mainComponents/MainNavigation";
import BottomNavigator from "../components/homeComponents/BottomNavigator";
import SideBar from "../components/mainComponents/SideBar";
import { useEffect, useState } from "react";
import SideBarHeader from "../components/sideBarComponents/SideBarHeader";
import { Content, Navigation } from "../components/mainComponents/SideBar";
import "../sidebar.css";

const Root = () => {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update window width
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const screen = {
    large: windowWidth > 992,
    medium: windowWidth > 768,
    small: windowWidth > 576,
    xsmall: windowWidth > 400,
  };

  return (
    <>
      <div id="notifications" className="notifications"></div>
      {!screen.medium && <MainNavigation screen={screen}></MainNavigation>}

      <main className={`d-sm-block d-md-flex w-100`}>
        {screen.medium && <Navigation></Navigation>}

        <Outlet></Outlet>

        {(location.pathname === "/" ||
          location.pathname === "/tickets" ||
          location.pathname === "/notifications" ||
          location.pathname === "/profile") &&
          !screen.medium && <BottomNavigator />}
      </main>
    </>
  );
};
export default Root;

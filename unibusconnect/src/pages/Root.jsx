import { Outlet, useLocation } from "react-router-dom";
import MobileNavigation from "../components/navigation/mobile-nav/MobileNav";
import BottomNavigator from "../components/homeComponents/BottomNavigator";
import { useEffect, useState } from "react";
import Navigation from "../components/navigation/Navigation";
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
      {!screen.medium && <MobileNavigation screen={screen}></MobileNavigation>}

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

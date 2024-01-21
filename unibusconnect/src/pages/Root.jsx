import { Outlet, useLocation } from "react-router-dom";
import MainNavigation from "../components/mainComponents/MainNavigation";
import BottomNavigator from "../components/homeComponents/BottomNavigator";
import SideBar from "../components/mainComponents/SideBar";
import { useEffect, useState } from "react";
import SideBarHeader from "../components/sideBarComponents/SideBarHeader";
import { Content } from "../components/mainComponents/SideBar";
import "../demo.css";

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
        {screen.medium && (<nav
          role="navigation"
          className={`hc-offcanvas-nav hc-nav-1 nav-levels-overlap nav-position-left disable-body touch-device nav-open me-3`}
          aria-hidden="true"
          aria-labelledby="hc-nav-1"
          style={{
            visibility: "visible",
          }}
        >
          <div className="nav-container">
            <div
              className="nav-wrapper nav-wrapper-0"
              data-level="0"
              data-index="0"
            >
              <div className="nav-content">
                <ul role="menu" aria-level="1" className="second-nav">
                  <SideBarHeader></SideBarHeader>

                  <Content />
                </ul>
              </div>
            </div>
          </div>
        </nav>)}

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

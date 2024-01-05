import { Outlet, useLocation } from "react-router-dom";
import MainNavigation from "../components/mainComponents/MainNavigation";
import BottomNavigator from "../components/homeComponents/BottomNavigator";
import "../demo.css";

const Root = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <div id="notifications" className="notifications"></div>
      <MainNavigation />
      <main>
        <Outlet></Outlet>

        {(location.pathname === "/" ||
          location.pathname === "/tickets" ||
          location.pathname === "/notifications" ||
          location.pathname === "/profile") && <BottomNavigator />}
      </main>
    </>
  );
};
export default Root;

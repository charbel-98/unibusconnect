import { createPortal } from "react-dom";
import Portal from "../../../UI/Portal";
import Navigation from "../Navigation";
function SideBar() {
  return (
    <>
      {createPortal(<Portal></Portal>, document.getElementById("portal"))}
      {createPortal(<Navigation />, document.getElementById("sideBar"))}
    </>
  );
}
export default SideBar;

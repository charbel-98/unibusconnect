import { createPortal } from "react-dom";
import Portal from "../../UI/Portal";
import NavParentItem from "../sideBarComponents/NavParentItem";
import { BusFront } from "react-bootstrap-icons";
import NavItem from "../sideBarComponents/NavItem";
import {
  BellFill,
  BoxArrowLeft,
  ChatRightDotsFill,
  CreditCardFill,
  FlagFill,
  HouseFill,
  Percent,
  PersonFill,
  TicketPerforatedFill,
} from "react-bootstrap-icons";
import SideBarHeader from "../sideBarComponents/SideBarHeader";
import { useSelector } from "react-redux";

const navItems = [
  {
    title: "Home",
    icon: <HouseFill className="me-3" />,

    isParentItem: false,
    path: "/",
    isLogout: false,
  },
  {
    title: "Offers",
    icon: <Percent className="me-3" />,

    isParentItem: false,
    path: "/",
    isLogout: false,
  },
  {
    title: "Notifications",
    icon: <BellFill className="me-3" />,

    isParentItem: false,
    path: "/notification",
    isLogout: false,
  },
  {
    title: "Tickets",
    icon: <TicketPerforatedFill className="me-3" />,

    isParentItem: false,
    path: "/tickets",
    isLogout: false,
  },
  {
    title: "Report",
    icon: <FlagFill className="me-3" />,

    isParentItem: true,
  },
  {
    title: "Payment",
    icon: <CreditCardFill className="me-3" />,

    isParentItem: false,
    path: "/",
    isLogout: false,
  },
  {
    title: "Profile",
    icon: <PersonFill className="me-3" />,

    isParentItem: true,
  },
  {
    title: "Default Location",
    icon: <BellFill className="me-3" />,
    isParentItem: false,
    path: "/default-location",
    isLogout: false,
    warning: true,
  },
  {
    title: "Admin",
    icon: <PersonFill className="me-3" />,

    isParentItem: true,
  },
  {
    title: "Contact US",
    icon: <ChatRightDotsFill className="me-3" />,

    isParentItem: false,
    path: "/support",
    isLogout: false,
  },
  {
    title: "Logout",
    icon: <BoxArrowLeft className="me-3" />,

    isParentItem: false,
    path: "/welcome",
    isLogout: true,
  },
];
function SideBar() {
  const content = navItems.map(
    ({ title, icon, isParentItem, path, isLogout, warning }, i) => {
      const defaultLocation = useSelector(
        (state) => state?.auth?.user?.defaultLocation
      );
      navItems[7].warning =
      (!defaultLocation.lat || !defaultLocation.lng);
      return isParentItem ? (
        <NavParentItem title={title} icon={icon} i={i} />
      ) : (
        <NavItem
          class={warning ? "notify" : ""}
          title={title}
          i={i}
          icon={icon}
          path={path}
          isLogout={isLogout}
        />
      );
    }
  );

  return (
    <>
      {createPortal(<Portal></Portal>, document.getElementById("portal"))}
      {createPortal(
        <nav
          role="navigation"
          className={`hc-offcanvas-nav hc-nav-1 nav-levels-overlap nav-position-left disable-body touch-device nav-open
    }`}
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

                  {content}
                </ul>
              </div>
            </div>
          </div>
        </nav>,
        document.getElementById("sideBar")
      )}
    </>
  );
}
export default SideBar;

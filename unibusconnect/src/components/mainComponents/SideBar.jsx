import { createPortal } from "react-dom";
import Portal from "../../UI/Portal";
import { GeoAltFill } from "react-bootstrap-icons";
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
import { navParentItems } from "../sideBarComponents/sideBarData";

const navItems = [
  {
    title: "Home",
    icon: <HouseFill className="me-3" />,

    isParentItem: false,
    path: "/",
    isLogout: false,
  },
  // {
  //   title: "Offers",
  //   icon: <Percent className="me-3" />,

  //   isParentItem: false,
  //   path: "/",
  //   isLogout: false,
  // },
  {
    title: "Notifications",
    icon: <BellFill className="me-3" />,

    isParentItem: false,
    path: "/notifications",
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
  // {
  //   title: "Payment",
  //   icon: <CreditCardFill className="me-3" />,

  //   isParentItem: false,
  //   path: "/",
  //   isLogout: false,
  // },
  {
    title: "Profile",
    icon: <PersonFill className="me-3" />,

    isParentItem: true,
  },
  {
    title: "Default Location",
    icon: <GeoAltFill className="me-3" />,
    isParentItem: false,
    path: "/default-location",
    isLogout: false,
    warning: true,
  },
  // {
  //   title: "Admin",
  //   icon: <PersonFill className="me-3" />,

  //   isParentItem: true,
  // },
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
export const Content = () =>
  navItems.map(({ title, icon, isParentItem, path, isLogout, warning }, i) => {
    const defaultLocation = useSelector(
      (state) => state?.auth?.user?.defaultLocation
    );
    navItems[5].warning = !defaultLocation?.lat || !defaultLocation?.lng;
    return isParentItem ? (
      // <NavParentItem title={title} icon={icon} key={i} />
      <details key={i}>
        <summary
          className="nav-item d-flex align-items-center"
          role="menu-item"
        >
          {icon} {title}
          <span className="ms-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 
              10.293l5.646-5.647a.5.5 0 1 1 
              .708.708l-6 6a.5.5 0 0 1-.708 
              0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
        </summary>
        <ul className="ps-4">
          {navParentItems[title].map(({ title, id, path }, j) => (
            <NavItem title={title} path={path} icon={icon} key={j} />
          ))}
        </ul>
      </details>
    ) : (
      <NavItem
        class={warning ? "notify" : ""}
        title={title}
        icon={icon}
        path={path}
        isLogout={isLogout}
        key={i}
      />
    );
  });
export function Navigation() {
  return (
    <nav
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
    </nav>
  );
}
function SideBar() {
  return (
    <>
      {createPortal(<Portal></Portal>, document.getElementById("portal"))}
      {createPortal(<Navigation />, document.getElementById("sideBar"))}
    </>
  );
}
export default SideBar;

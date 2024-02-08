import NavigationHeader from "./nav-components/NavigationHeader";
import NavItem from "./nav-components/NavItem";
import { navParentItems } from "./nav-components/sideBarData";
import { useSelector } from "react-redux";
import NavParentItem from "./nav-components/NavParentItem";
import {
  BellFill,
  GeoAltFill,
  BoxArrowLeft,
  ChatRightDotsFill,
  CreditCardFill,
  FlagFill,
  HouseFill,
  Percent,
  PersonFill,
  TicketPerforatedFill,
} from "react-bootstrap-icons";
const navItems = [
  {
    title: "Home",
    icon: <HouseFill className="me-3" />,

    isParentItem: false,
    path: "/",
    isLogout: false,
  },

  {
    title: "Notifications",
    icon: <BellFill className="me-3" />,

    isParentItem: false,
    path: "/notifications",
    isLogout: false,
  },

  {
    title: "Profile",
    icon: <PersonFill className="me-3" />,

    isParentItem: true,
  },

  {
    title: "Logout",
    icon: <BoxArrowLeft className="me-3" />,

    isParentItem: false,
    path: "/welcome",
    isLogout: true,
  },
];

export const NavItems = () =>
  navItems.map(({ title, icon, isParentItem, path, isLogout, warning }, i) => {
    return isParentItem ? (
      <NavParentItem
        key={i}
        title={title}
        _title={navParentItems[title]}
        icon={icon}
      ></NavParentItem>
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

function Navigation() {
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
              <NavigationHeader></NavigationHeader>

              <NavItems />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navigation;

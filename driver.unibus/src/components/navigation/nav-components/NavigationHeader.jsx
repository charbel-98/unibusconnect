import { useSelector } from "react-redux";
import placeHolder from "../../../img/profilePlaceHolder.png";
function NavigationHeader() {
  const user = useSelector((state) => state.auth.user);
  return (
    <li key={"h1"}>
      <div className="nav-item-wrapper">
        <a
          href="#"
          className="bg-danger sidebar-user d-flex align-items-center py-4 px-3 border-0 mb-0 nav-item"
          tabIndex="0"
          role="menuitem"
        >
          <img
            src={user?.avatar ? user.avatar : placeHolder}
            className="img-fluid rounded-pill me-3 w-25 "
          />
          <div className="text-white">
            <h6 className="mb-0">{user?.name}</h6>
            <small>
              {user?.mobile ? `+961 ${user?.mobile}` : `${user?.email}`}
            </small>
            <br />
            <span className="f-10 text-white-50">Version 1.32</span>
          </div>
        </a>
      </div>
    </li>
  );
}
export default NavigationHeader;

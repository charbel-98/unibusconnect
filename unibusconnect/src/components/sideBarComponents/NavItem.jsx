import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import { close } from "../../redux/sideBarSlice";
function NavItem(props) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("filter");
    localStorage.removeItem("universities");
    localStorage.removeItem("cities");
    dispatch(logout());
    dispatch(close());
    console.log();
  };
  const closeHandler = () => {
    dispatch(close());
  };
  return (
    <li key={props.i}>
      <div className="nav-item-wrapper">
        <Link
          className="nav-item"
          tabIndex="0"
          role="menuitem"
          to={props.path}
          onClick={props.isLogout ? logoutHandler : closeHandler}
        >
          {props.icon} {props.title}
        </Link>
      </div>
    </li>
  );
}
export default NavItem;

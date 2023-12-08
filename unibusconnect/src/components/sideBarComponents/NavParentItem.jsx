import { useDispatch, useSelector } from "react-redux";
import Portal from "../../UI/Portal";
import NestedSideBar from "../mainComponents/NestedSideBar";
import { openNested } from "../../redux/sideBarSlice";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
function NavParentItem(props) {
  const { openNestedSideBar } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();
  return (
    <li
      key={props.i}
      className={`nav-parent ${openNestedSideBar.open ? "level-open" : ""}`}
    >
      <input
        type="checkbox"
        id="hc-nav-1-1-0"
        className="hc-chk"
        tabIndex="-1"
        data-level="1"
        data-index="0"
        value="18lfsbx16z3"
      />
      <div className="nav-item-wrapper">
        <div
          className="nav-item"
          role="menuitem"
          aria-controls="menu-18lfsbx16z3"
          aria-haspopup="true"
          aria-expanded={`${openNestedSideBar.open}`}
          onClick={() => dispatch(openNested(props.title))}
        >
          {props.icon} {props.title}
          <span className="nav-next"></span>
        </div>
      </div>
      {openNestedSideBar.open && <NestedSideBar />}
    </li>
  );
}
export default NavParentItem;

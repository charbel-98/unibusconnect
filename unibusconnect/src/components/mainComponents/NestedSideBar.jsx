import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { close } from "../../redux/sideBarSlice";

function NestedItem({ title, path }) {
  const dispatch = useDispatch();
  return (
    <li>
      <div className="nav-item-wrapper">
        <Link
          to={path}
          role="menuitem"
          tabIndex="0"
          onClick={() => dispatch(close(true))}
        >
          {title}
        </Link>
      </div>
    </li>
  );
}

function NestedSideBar() {
  const { title, content } = useSelector(
    (state) => state.sideBar.openNestedSideBar
  );
  return (
    <div className="nav-wrapper nav-wrapper-1" data-level="1" data-index="0">
      <div className="nav-content ps-4">
        <h2 className="ms-3">{title}</h2>
        <ul className="ms-4">
          {content?.map((item, i) => (
            <NestedItem title={item.title} key={i} path={item.path} />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default NestedSideBar;

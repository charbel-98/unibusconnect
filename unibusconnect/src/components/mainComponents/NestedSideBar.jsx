import { useSelector } from "react-redux";

function NestedItem({ title, id }) {
  return (
    <li key={id}>
      <div className="nav-item-wrapper">
        <a href="#" role="menuitem" tabIndex="0">
          {title}
        </a>
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
          {content?.map((item) => (
            <NestedItem title={item.title} id={item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default NestedSideBar;

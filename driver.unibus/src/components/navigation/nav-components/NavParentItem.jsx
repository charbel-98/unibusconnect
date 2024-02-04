import NavItem from "./NavItem";

function NavParentItem(props) {
  return (
    // <NavParentItem title={title} icon={icon} key={i} />
    <details>
      <summary className="nav-item d-flex align-items-center" role="menu-item">
        {props.icon} {props.title}
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
        {props._title.map(({ title, id, path }, j) => (
          <NavItem title={title} path={path} icon={props.icon} key={j} />
        ))}
      </ul>
    </details>
  );
}
export default NavParentItem;

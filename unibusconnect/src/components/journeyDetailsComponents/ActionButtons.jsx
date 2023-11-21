import { useState } from "react";
import { InfoCircleFill, StarFill, ClockFill } from "react-bootstrap-icons";
function DetailsButton({ active, title, icon, id, onClick }) {
  return (
    <li className="nav-item" role="presentation">
      <button
        id={id}
        className={`nav-link ${active ? "active" : "text-danger"}`}
        onClick={onClick}
      >
        {icon} {title}
      </button>
    </li>
  );
}

function ActionButtons({ activeButton, onClick }) {
  return (
    <ul
      className="nav nav-pills mb-0 nav-justified bg-white px-3 py-2 border-top border-bottom"
      id="pills-tab"
      role="tablist"
    >
      <DetailsButton
        title="Info"
        icon={<InfoCircleFill />}
        active={activeButton.info}
        id="info"
        onClick={onClick}
      />
      <DetailsButton
        title="Review"
        icon={<StarFill />}
        active={activeButton.review}
        id="review"
        onClick={onClick}
      />
      <DetailsButton
        title="Pick Up"
        icon={<ClockFill />}
        active={activeButton.pickup}
        id="pickup"
        onClick={onClick}
      />
    </ul>
  );
}
export default ActionButtons;

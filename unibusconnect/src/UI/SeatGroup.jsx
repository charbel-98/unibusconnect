import { useState } from "react";

function SeatGroup({ char, isPair }) {
  const [isActive1, setIsActive1] = useState(false);

  const [isActive2, setIsActive2] = useState(false);

  console.log(isActive1);
  return (
    <div
      className="btn-group btn-group-toggle d-block mb-1"
      data-toggle="buttons"
    >
      <label
        className={`btn check-seat btn-success small btn-sm rounded ${
          isPair && "me-2"
        } mb-2 ${isActive1 ? "active" : ""}`}
        onChange={() => {
          setIsActive1((prev) => !prev);
        }}
      >
        <input
          type="checkbox"
          name={`${char.toLowerCase()}+1`}
          autocomplete="off"
        />
        {isPair ? char + "1" : char + "3"}
      </label>
      {isPair && (
        <label
          className={`btn check-seat btn-success small btn-sm rounded me-2 mb-2 ${
            isActive2 ? "active" : ""
          }`}
          onChange={() => {
            setIsActive2((prev) => !prev);
          }}
        >
          {" "}
          <input
            type="checkbox"
            name={`${char.toLowerCase()}+2`}
            autocomplete="off"
          />
          {char + "2"}
        </label>
      )}
    </div>
  );
}
export default SeatGroup;

import { set } from "date-fns";
import { useEffect, useState } from "react";

function SeatGroup({
  char,
  isPair,
  setSelectedSeat,
  selectedSeat,
  change,
  setChange,
}) {
  const [isActive1, setIsActive1] = useState(false);

  const [isActive2, setIsActive2] = useState(false);

  console.log(isActive1);
  useEffect(() => {
    setIsActive1(false);
    setIsActive2(false);
  }, [change]);

  return (
    <div
      className="btn-group btn-group-toggle d-block mb-1"
      data-toggle="buttons"
    >
      <label
        className={`btn check-seat btn-success small btn-sm rounded ${
          isPair && "me-2"
        } mb-2 ${isActive1 ? "active" : ""}`}
        onChange={(e) => {
          console.log(e.target.name);
          if (
            (isPair && e.target.name === `${char.toLowerCase()}+1`) ||
            (!isPair && e.target.name === `${char.toLowerCase()}+3`)
          ) {
            setIsActive1(true);
            setIsActive2(false);
            setChange(!change);
          } else {
            setIsActive1(false);
            setIsActive2(false);
          }
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
          onChange={(e) => {
            console.log(selectedSeat);
            if (e.target.name === `${char.toLowerCase()}+2`) {
              setIsActive1(false);
              setIsActive2(true);
              setChange(!change);
            } else {
              setIsActive2(false);
              setIsActive1(false);
            }
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

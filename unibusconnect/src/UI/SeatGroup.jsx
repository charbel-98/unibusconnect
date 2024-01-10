import { set } from "date-fns";
import { useEffect, useState } from "react";

function SeatGroup({
  char,
  selectedSeat,
  setSelectedSeat,
}) {

  return (
    <div className="d-flex">
      <div
        className="btn-group-toggle d-flex mb-1 gap-2"
        data-toggle="buttons"
      >
        <label
          className={`btn check-seat btn-success small btn-sm rounded mb-2 ${selectedSeat === char + "1" ? "active" : ""}`}
        >
          <input
            type="checkbox"
            name={`${char}1`}
            autoComplete="off"
            checked={selectedSeat === char + "1"}
            onChange={(e) => {
              setSelectedSeat(e.target.name)
            }}
          />
          {char + "1"}
        </label>

        <label
          className={`btn check-seat btn-success small btn-sm rounded mb-2 ${selectedSeat === char + "2" ? "active" : ""}`}
        >
          <input
            type="checkbox"
            name={`${char}2`}
            autoComplete="off"
            checked={selectedSeat === char + "2"}
            onChange={(e) => {
              setSelectedSeat(e.target.name)
            }}
          />
          {char + "2"}
        </label>
      </div>

      <div
        className="btn-group-toggle d-flex mb-1 gap-2"
        data-toggle="buttons"
        style={{ marginLeft: "auto" }}
      >
        <label
          className={`btn check-seat btn-success small btn-sm rounded mb-2 ${selectedSeat === char + "3" ? "active" : ""}`}
        >
          <input
            type="checkbox"
            name={`${char}3`}
            autoComplete="off"
            checked={selectedSeat === char + "3"}
            onChange={(e) => {
              setSelectedSeat(e.target.name)
            }}
          />
          {char + "3"}
        </label>
      </div>
    </div>

  );
}
export default SeatGroup;

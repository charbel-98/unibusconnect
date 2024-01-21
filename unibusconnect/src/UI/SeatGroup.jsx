import { set } from "date-fns";
import { useEffect, useState } from "react";

function SeatGroup({
  char
}) {

  return (
    <div className="d-flex">
      <div
        className="btn-group-toggle d-flex mb-1 gap-2"
        data-toggle="buttons"
      >
        <label
          className={`btn check-seat btn-success small btn-sm rounded mb-2`}
        >
          <input
            type="radio"
            name={"seat"}
            value={`${char}1`}
            autoComplete="off"
          />
          {char + "1"}
        </label>

        <label
          className={`btn check-seat btn-success small btn-sm rounded mb-2`}
        >
          <input
            type="radio"
            name={"seat"}
            value={`${char}2`}
            autoComplete="off"
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
          className={`btn check-seat btn-success small btn-sm rounded mb-2`}
        >
          <input
            type="radio"
            name={"seat"}
            value={`${char}3`}
            autoComplete="off"
          />
          {char + "3"}
        </label>
      </div>
    </div>

  );
}
export default SeatGroup;

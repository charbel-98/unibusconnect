import { useEffect, useState } from "react";
import SeatGroup from "./SeatGroup";
import driver from "../img/driver.png";
export const SelectSeat = () => {
  const [seats, setSeats] = useState([]);
  useEffect(() => {
    let seatRows = 10;
    let seatsArray = [];
    for (let i = 65; i <= 65 + seatRows; i++) {
      seatsArray.push(<SeatGroup key={i} char={String.fromCharCode(i)} />);
    }
    setSeats(seatsArray);

    return () => {
      seatRows = null;
      seatsArray = null;
    };
  }, []);

  return (
    <div className="select-seat row bg-white mx-0 px-3 pt-3 pb-1 mb-3 rounded-1 shadow-sm">
      <div className="ps-10">
        <div className="d-flex">
          <div className="sold text-center">
            <img src={driver} className="img-fluid mb-1" />
            {/* <p className="small f-10">Sold Out</p> */}
          </div>
          <div className="sold text-center mx-3">
            <img hidden className="img-fluid mb-1" />
            {/* <p className="small f-10">Available</p> */}
          </div>
          <div className="sold text-center">
            <img hidden className="img-fluid mb-1" />
            {/* <p className="small f-10">Selected</p> */}
          </div>
        </div>

        <div className="select-seat">
          <div className="checkboxes-seat mt-4">{seats}</div>
        </div>
      </div>
    </div>
  );
};

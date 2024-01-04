import { useState } from "react";
import SeatGroup from "./SeatGroup";
export const SelectSeat = () => {
  const [selectSeat, setSelectSeat] = useState(false);
  const [change, setChange] = useState(false);
  return (
    <div className="select-seat row bg-white mx-0 px-3 pt-3 pb-1 mb-3 rounded-1 shadow-sm">
      <div className="col-8 ps-0">
        <div className="d-flex">
          <div className="sold text-center">
            <img src="img/sold-seat.png" className="img-fluid mb-1" />
            <p className="small f-10">Sold Out</p>
          </div>
          <div className="sold text-center mx-3">
            <img src="img/available-seat.png" className="img-fluid mb-1" />
            <p className="small f-10">Available</p>
          </div>
          <div className="sold text-center">
            <img src="img/selected-seat.png" className="img-fluid mb-1" />
            <p className="small f-10">Selected</p>
          </div>
        </div>

        <div className="select-seat">
          <div className="checkboxes-seat mt-4">
            <SeatGroup
              isPair={true}
              selectedSeat={selectSeat}
              setSelectedSeat={setSelectSeat}
              change={change}
              setChange={setChange}
              char="A"
            />
            <SeatGroup
              isPair={true}
              selectedSeat={selectSeat}
              setSelectedSeat={setSelectSeat}
              change={change}
              setChange={setChange}
              char="B"
            />
            <SeatGroup
              isPair={true}
              selectedSeat={selectSeat}
              setSelectedSeat={setSelectSeat}
              change={change}
              setChange={setChange}
              char="C"
            />
            <SeatGroup
              isPair={true}
              selectedSeat={selectSeat}
              setSelectedSeat={setSelectSeat}
              change={change}
              setChange={setChange}
              char="D"
            />
            <SeatGroup
              isPair={true}
              selectedSeat={selectSeat}
              setSelectedSeat={setSelectSeat}
              change={change}
              setChange={setChange}
              char="E"
            />
            <SeatGroup
              isPair={true}
              selectedSeat={selectSeat}
              setSelectedSeat={setSelectSeat}
              change={change}
              setChange={setChange}
              char="F"
            />
            <SeatGroup
              isPair={true}
              selectedSeat={selectSeat}
              setSelectedSeat={setSelectSeat}
              change={change}
              setChange={setChange}
              char="G"
            />
          </div>
        </div>
      </div>
      <div className="col-4 text-right ps-0">
        <img src="img/driver.png" className="img-fluid mb-4" />
        <div className="checkboxes-seat mt-4">
          <SeatGroup
            isPair={false}
            selectedSeat={selectSeat}
            setSelectedSeat={setSelectSeat}
            change={change}
            setChange={setChange}
            char="A"
          />
          <SeatGroup
            isPair={false}
            selectedSeat={selectSeat}
            setSelectedSeat={setSelectSeat}
            change={change}
            setChange={setChange}
            char="B"
          />
          <SeatGroup
            isPair={false}
            selectedSeat={selectSeat}
            setSelectedSeat={setSelectSeat}
            change={change}
            setChange={setChange}
            char="C"
          />
          <SeatGroup
            isPair={false}
            selectedSeat={selectSeat}
            setSelectedSeat={setSelectSeat}
            change={change}
            setChange={setChange}
            char="D"
          />
          <SeatGroup
            isPair={false}
            selectedSeat={selectSeat}
            setSelectedSeat={setSelectSeat}
            change={change}
            setChange={setChange}
            char="E"
          />
          <SeatGroup
            isPair={false}
            selectedSeat={selectSeat}
            setSelectedSeat={setSelectSeat}
            change={change}
            setChange={setChange}
            char="F"
          />
          <SeatGroup
            isPair={false}
            selectedSeat={selectSeat}
            setSelectedSeat={setSelectSeat}
            change={change}
            setChange={setChange}
            char="G"
          />
        </div>
      </div>
    </div>
  );
};

import SeatGroup from "./SeatGroup";
export const SelectSeat = () => {
  return (
    <div className="select-seat row bg-white mx-0 px-3 pt-3 pb-1 mb-3 rounded-1 shadow-sm">
      <div className="col-8 pl-0">
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
            <SeatGroup isPair={true} char="A" />
            <SeatGroup isPair={true} char="B" />
            <SeatGroup isPair={true} char="C" />
            <SeatGroup isPair={true} char="D" />
            <SeatGroup isPair={true} char="E" />
            <SeatGroup isPair={true} char="F" />
            <SeatGroup isPair={true} char="G" />
          </div>
        </div>
      </div>
      <div className="col-4 text-right pr-0">
        <img src="img/driver.png" className="img-fluid mb-4" />
        <div className="checkboxes-seat mt-4">
          <SeatGroup isPair={false} char="A" />
          <SeatGroup isPair={false} char="B" />
          <SeatGroup isPair={false} char="C" />
          <SeatGroup isPair={false} char="D" />
          <SeatGroup isPair={false} char="E" />
          <SeatGroup isPair={false} char="F" />
          <SeatGroup isPair={false} char="G" />
        </div>
      </div>
    </div>
  );
};

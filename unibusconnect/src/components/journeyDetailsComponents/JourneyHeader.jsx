import bus from "../../img/item1.png";
import Rating from "../../UI/Rating";
import { GeoAltFill, BusFrontFill } from "react-bootstrap-icons";
import st from "../../img/st.png";
function JourneyHeader({ from, to, sp }) {
  return (
    <div className="px-3 py-3 tic-div border-bottom d-flex">
      <img
        src={st}
        className="img-fluid border rounded p-1 shape-img me-3 img-shadow"
      />
      <div className="w-100">
        <h6 className="my-1 l-hght-18 fw-bold">{sp}</h6>
        <div className="start-rating f-10">
          <Rating />

          <div className="d-flex mt-2">
            <p className="m-0">
              <GeoAltFill className="me-1 text-danger " size={10} />
              <span className="small">
                {from} to {to}
              </span>
            </p>
            <p className="small ms-auto mb-0">
              <BusFrontFill className="me-1 text-danger" size={10} /> St. $1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JourneyHeader;

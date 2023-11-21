import { StarFill } from "react-bootstrap-icons";
function Rating() {
  return (
    <div className="star-rating small">
      <StarFill className="text-danger " />
      <StarFill className="text-danger " />
      <StarFill className="text-danger " />
      <StarFill className="text-danger " />
      <StarFill className="text-muted " />

      <span className="text-dark">4.0</span>
    </div>
  );
}
export default Rating;

import { ArrowLeftCircle } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
const AuthHeader = ({ title }) => {
  return (
    <div className="osahan-header-nav shadow-sm p-3 d-flex align-items-center bg-danger">
      <h5 className="font-weight-normal mb-0 text-white">
        <Link className="text-light mr-3" to="..">
          <ArrowLeftCircle className="me-2" size={25} />
        </Link>
        {title}
      </h5>
    </div>
  );
};
export default AuthHeader;

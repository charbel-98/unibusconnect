import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import {
  HouseFill,
  TicketPerforatedFill,
  BellFill,
  PersonFill,
} from "react-bootstrap-icons";
import classes from "./bottomNavigator.module.css";
function BottomNavigator() {
  return (
    <div className="fixed-bottom p-3">
      <div
        className={`${classes.footerMenu}
        } row m-0 bg-danger shadow rounded-2`}
      >
        <div className="col-3 p-0 text-center">
          <Link to="/" className={`text-white ${classes.active}`}>
            <HouseFill size={25} />
            <p className="mb-0 small">Home</p>
          </Link>
        </div>
        <div className="col-3 p-0 text-center">
          <Link to="/tickets" className="home text-white">
            <TicketPerforatedFill size={25} />
            <p className="mb-0 small">My Tickets</p>
          </Link>
        </div>
        <div className="col-3 p-0 text-center">
          <Link to="/notifications" className="home text-white">
            <BellFill size={25} />
            <small className={classes.osahan}>4</small>
            <p className="mb-0 small">Notice</p>
          </Link>
        </div>
        <div className="col-3 p-0 text-center">
          <Link to="profile" className="home text-white">
            <PersonFill size={25} />
            <p className="mb-0 small">Account</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomNavigator;

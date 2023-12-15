import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `home ${classes.active}` : "home text-white"
            }
          >
            <HouseFill size={25} />
            <p className="mb-0 small">Home</p>
          </NavLink>
        </div>
        <div className="col-3 p-0 text-center">
          <NavLink
            to="/tickets"
            className={({ isActive }) =>
              isActive ? `home ${classes.active}` : "home text-white"
            }
          >
            <TicketPerforatedFill size={25} />
            <p className="mb-0 small">My Tickets</p>
          </NavLink>
        </div>
        <div className="col-3 p-0 text-center">
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? `home ${classes.active}` : "home text-white"
            }
          >
            <BellFill size={25} />
            <small className={classes.osahan}>4</small>
            <p className="mb-0 small">Notice</p>
          </NavLink>
        </div>
        <div className="col-3 p-0 text-center">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              isActive ? `home ${classes.active}` : "home text-white"
            }
          >
            <PersonFill size={25} />
            <p className="mb-0 small">Account</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default BottomNavigator;

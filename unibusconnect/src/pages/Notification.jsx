import {
  CheckLg,
  XLg,
  Clock,
  Percent,
  PersonFill,
} from "react-bootstrap-icons";
import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TicketsSkeleton from "../UI/skeleton-components/TicketsSkeleton";
import NotificationsSkeleton from "../UI/skeleton-components/NotificationsSkeleton";
const Notification = () => {
  const [notifications, setNotification] = useState([]);
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const transformDate = (date) => {
    const diffTime = Math.abs(new Date() - new Date(date));
    if (diffTime < 60000) {
      return "Just Now";
    } else if (diffTime < 3600000) {
      return `${Math.floor(diffTime / 60000)} minutes ago`;
    } else if (diffTime < 86400000) {
      return `${Math.floor(diffTime / 3600000)} hours ago`;
    } else if (diffTime < 604800000) {
      return `${Math.floor(diffTime / 86400000)} days ago`;
    } else if (diffTime < 2629800000) {
      return `${Math.floor(diffTime / 604800000)} weeks ago`;
    } else if (diffTime < 31557600000) {
      return `${Math.floor(diffTime / 2629800000)} months ago`;
    } else {
      return `${Math.floor(diffTime / 31557600000)} years ago`;
    }
  };
  // "confirmation", "cancellation", "discount", "reminder"
  const elementType = {
    confirmation: (
      <div className="icon pe-3">
        <span className="icofont-check-alt bg-success text-white mb-0 rounded-pill">
          <CheckLg size={20} />
        </span>
      </div>
    ),
    cancelation: (
      <div className="icon pe-3">
        <span className="icofont-close bg-danger text-white mb-0 rounded-pill">
          <XLg size={20} />
        </span>
      </div>
    ),
    discount: (
      <div className="icon pe-3">
        <span className="percentage bg-primary text-white mb-0 rounded-pill p-1">
          <Percent size={15} />
        </span>
      </div>
    ),
    reminder: (
      <div className="icon pe-3">
        <span className=" bg-warning text-dark mb-0 rounded-pill">
          <Clock size={15} />
        </span>
      </div>
    ),
    profile: (
      <div className="icon pe-3">
        <span className=" bg-warning text-dark mb-0 rounded-pill">
          <PersonFill size={15} />
        </span>
      </div>
    ),
  };
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
    const getNotifications = async () => {
      try {
        const response = await axiosPrivate.get("/notifications", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setNotification(response.data.notifications);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
        setIsLoading(false);
      }
    };
    getNotifications();

    return () => {
      isMounted = false;
      setIsLoading(false);
      controller.abort();
    };
  }, []);

  return (
    <div className="osahan-notification padding-bt">
      <div className="osahan-notification p-3">
        {isLoading && <NotificationsSkeleton cards={3} />}
        {(!isLoading &&
          notifications.length > 0 &&
          notifications.map((notification, i) => {
            notification.seen = Math.random() > 0.5;
            return (
              <Link
                to={`${notification._id}`}
                className={`notification d-flex align-items-center m-0 bg-white text-black border-bottom p-3 ${
                  notification.seen ? "" : ""
                }`}
              >
                {/* <div className="d-flex"> */}
                {elementType[notification.type]}
                <div className="noti-details l-hght-18 pe-0 flex-grow-1">
                  <div className="mb-1 d-flex justify-content-between">
                    {notification.type}
                    <span className="small text-right text-truncate">
                      {transformDate(notification.date)}
                    </span>
                  </div>
                  <span className="small text-muted two-lines">
                    {notification.message}
                  </span>
                </div>
                {/* </div> */}
              </Link>
            );
          })) ||
          (!isLoading && (
            <div className="text-center w-100">
              {" "}
              <h5 className="small text-muted">No Notifications Found !</h5>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Notification;

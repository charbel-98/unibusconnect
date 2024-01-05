import { CheckLg, XLg, Clock, Percent } from "react-bootstrap-icons";
import React from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TicketsSkeleton from "../UI/skeleton-components/TicketsSkeleton";


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
  }
  // "confirmation", "cancellation", "discount", "reminder"
  const elementType = {
    "confirmation": (<div className="icon pe-3">
      <span className="icofont-check-alt bg-success text-white mb-0 rounded-pill">
        <CheckLg size={20} />
      </span>
    </div>),
    "cancellation": (<div className="icon pe-3">
      <span className="icofont-close bg-danger text-white mb-0 rounded-pill">
        <XLg size={20} />
      </span>
    </div>),
    "discount": (<div className="icon pe-3">
      <span className="percentage bg-primary text-white mb-0 rounded-pill p-1">
        <Percent size={15} />
      </span>
    </div>),
    "reminder": (<div className="icon pe-3">
      <span className=" bg-warning text-dark mb-0 rounded-pill">
        <Clock size={15} />
      </span>
    </div>),

  }
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

        {isLoading && <TicketsSkeleton cards={3} />}
        {
          (!isLoading && notifications.length && notifications.map((notification, i) => {
            notification.seen = Math.random() > 0.5;
            return (
              <Link to={`${notification._id}`} className={`notification d-flex align-items-center m-0 bg-white text-black border-bottom p-3 ${notification.seen ? 'seen' : ''}`}>
                {/* <div className="d-flex"> */}
                {elementType[notification.type]}
                <div className="noti-details l-hght-18 pe-0">
                  <div className="mb-1 d-flex justify-content-between">
                    {notification.type}
                    <span className="small text-right text-truncate">{transformDate(notification.date)}</span>

                  </div>
                  <span className="small text-muted two-lines">
                    {notification.message}
                  </span>
                </div>
                {/* </div> */}
              </Link>
            );
          }) || (<div className="text-center w-100"> <h5 className="small text-muted">No Notifications Found !</h5></div>))
        }
        {/* 
        <div className="notification d-flex m-0 bg-white border-bottom p-3">
          <div className="icon pe-3">
            <span className="percentage bg-primary text-white mb-0 rounded-pill p-1">
              %
            </span>
          </div>
          <div className="noti-details l-hght-18 pe-0">
            <p className="mb-1">Today Discount</p>
            <span className="small text-muted">
              Hot Discount for today uer adipisicing wisted cllege
            </span>
          </div>
          <div className="f-10 px-0 text-right">
            <span>12:00.PM</span>
          </div>
        </div>

        <div className="notification d-flex m-0 bg-white border-bottom p-3">
          <div className="icon pe-3">
            <span className=" bg-warning text-dark mb-0 rounded-pill">
              <GiftFill size={15} />
            </span>
          </div>
          <div className="noti-details l-hght-18 pe-0">
            <p className="mb-1">Confirm your ticket</p>
            <span className="small text-muted">
              Confirm your ticket dolor sit ame nsectetuer adipisicing elit sed
            </span>
          </div>
          <div className="f-10 px-0 text-right">
            <span>03:20.PM</span>
          </div>
        </div>

        <div className="notification d-flex m-0 bg-white border-bottom p-3">
          <div className="icon pe-3">
            <span className="icofont-check-alt bg-success text-white mb-0 rounded-pill">
              <CheckLg size={20} />
            </span>
          </div>
          <div className="noti-details l-hght-18 pe-0">
            <p className="mb-1">Confirm your ticket</p>
            <span className="small text-muted">
              Confirm your ticket dolor sit ame nsectetuer adipisicing elit sed
            </span>
          </div>
          <div className="f-10 px-0 text-right">
            <span>01:11.AM</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default Notification;

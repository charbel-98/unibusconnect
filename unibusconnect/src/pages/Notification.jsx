import { CheckLg, GiftFill } from "react-bootstrap-icons";
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
      <div className="osahan-notification">

        {isLoading && <TicketsSkeleton cards={3} />}
        {notifications.map((notification, i) => {
          return (
            <div className="notification d-flex justify-content-between m-0 bg-white border-bottom p-3">
              <div className="d-flex">
                <div className="icon pe-3">
                  <span className="icofont-check-alt bg-success text-white mb-0 rounded-pill">
                    <CheckLg size={20} />
                  </span>
                </div>
                <div className="noti-details l-hght-18 pe-0">
                  <p className="mb-1">{notification.type}</p>
                  <span className="small text-muted">
                    {notification.message}
                  </span>
                </div>
              </div>
              <div className="f-10 p-2 text-right">
                <span>{new Date(notification.date).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
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

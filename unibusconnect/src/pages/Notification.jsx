import { CheckLg, GiftFill } from "react-bootstrap-icons";
const Notification = () => {
  return (
    <div className="osahan-notification padding-bt">
      <div className="osahan-notification">
        <div className="notification d-flex m-0 bg-white border-bottom p-3">
          <div className="icon pe-3">
            <span className="icofont-check-alt bg-success text-white mb-0 rounded-pill">
              <CheckLg size={20} />
            </span>
          </div>
          <div className="noti-details l-hght-18  ">
            <p className="mb-1">Confirm your ticket</p>
            <span className="small text-muted">
              Confirm your ticket dolor sit ame nsectetuer adipisicing elit sed
            </span>
          </div>
          <div className="f-10 px-0 text-right ">
            <span>10:14.AM</span>
          </div>
        </div>

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
        </div>
      </div>
    </div>
  );
};
export default Notification;

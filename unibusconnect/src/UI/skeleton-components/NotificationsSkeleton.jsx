import Skeleton from "react-loading-skeleton";

const NotificationsSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, i) => (
      <a
        key={i}
        className={`notification d-flex align-items-center m-0 bg-white text-black border-bottom p-3 `}
      >
        {/* <div className="d-flex"> */}
        <div className="icon pe-3">
          <span className="icofont-check-alt bg-success text-white mb-0 rounded-pill">
            <Skeleton circle />
          </span>
        </div>
        <div className="noti-details l-hght-18 pe-0 flex-grow-1">
          <div className="mb-1 d-flex justify-content-between">
            <Skeleton height={10} width={80} />
            <span className="small text-right text-truncate">
              <Skeleton height={10} width={70} />
            </span>
          </div>
          <span className="small text-muted two-lines">
            <Skeleton height={10} width={250} />
          </span>
        </div>
        {/* </div> */}
      </a>
    ));
};

export default NotificationsSkeleton;

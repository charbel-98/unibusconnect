import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const JourneyInstanceSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, i) => (
      <div key={i} className="text-dark col-6 px-0 ">
        <div className="list_item_gird m-0 bg-white shadow-sm listing-item border-bottom border-right">
          <div className="px-3 pt-3 tic-div">
            <div className="list-item-img">
              <Skeleton
                height={70}
                width={69.96}
                className="img-fluid img-shadow"
              />
            </div>
            <p className="mb-0 l-hght-10">
              <Skeleton height={9} width={100} />
            </p>
            <span className="text-danger small">
              <Skeleton height={9} width={100} />
            </span>
          </div>
          <div className="p-3 d-flex">
            <div className="bus_details w-100">
              <div className="d-flex">
                <p>
                  <Skeleton width={30} height={9} className="me-2" />
                </p>
                <p className="small ms-auto">
                  <Skeleton width={50} height={9} className="me-2" />
                </p>
              </div>
              <div className="d-flex l-hght-10">
                <div>
                  <small className="text-muted mb-2 d-block">
                    <Skeleton width={50} height={9} />
                  </small>
                  <p className="small">
                    <Skeleton width={100} height={9} />
                  </p>
                </div>
              </div>
              <div className="d-flex l-hght-10">
                <div>
                  <small className="text-muted mb-2 d-block">
                    <Skeleton width={50} height={9} />
                  </small>
                  <p className="small mb-1">
                    <Skeleton width={100} height={9} />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`status-element border border-2  mx-5 rounded-5 d-flex justify-content-center mb-3`}
          >
            <span>
              <Skeleton />
            </span>
          </div>
        </div>
      </div>
    ));
};
export default JourneyInstanceSkeleton;

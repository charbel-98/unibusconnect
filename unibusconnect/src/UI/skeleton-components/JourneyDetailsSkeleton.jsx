import Skeleton from "react-loading-skeleton";

const JourneyDetailsSkeleton = () => {
  return (
    <>
      <div className="list_item m-0 bg-white">
        <div className="px-3 py-3 tic-div border-bottom d-flex">
          <Skeleton
            height={70}
            width={69.96}
            className="img-fluid border rounded p-1 shape-img me-3 img-shadow"
          />
          <div className="w-100">
            <h6 className="my-1 l-hght-18 fw-bold">
              <Skeleton width={130} />
            </h6>
            <div className="start-rating f-10">
              <Skeleton width={100} />

              <div className="d-flex mt-2">
                <p className="m-0">
                  <span className="small">
                    <Skeleton width={140} />
                  </span>
                </p>
                <p className="small ms-auto mb-0">
                  <Skeleton width={50} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-3">
          <div className="row mx-0 mb-3">
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pe-1">
                <Skeleton width={20} />
              </small>
              <p className="small mb-0 l-hght-14">
                <Skeleton width={20} />
              </p>
            </div>
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pe-1">
                <Skeleton width={90} />
              </small>
              <p className="small mb-0 l-hght-14">
                <Skeleton width={60} />
              </p>
            </div>
          </div>
          <div className="row mx-0 mb-3">
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pe-1">
                <Skeleton width={90} />
              </small>
              <p className="small mb-0 l-hght-14">
                <Skeleton width={60} />
              </p>
            </div>
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pe-1">
                <Skeleton width={20} />
              </small>
              <p className="small mb-0 l-hght-14">
                <Skeleton width={110} />
              </p>
            </div>
          </div>
          <div className="row mx-0">
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pe-1">
                <Skeleton width={50} />
              </small>
              <p className="small mb-0 l-hght-14">
                <Skeleton width={70} />
              </p>
            </div>
            <div className="col-6 p-0">
              <small className="text-muted mb-1 f-10 pe-1">
                <Skeleton width={50} />
              </small>
              <p className="small mb-0 l-hght-14">
                <Skeleton width={20} />
              </p>
            </div>
          </div>
        </div>
        <ul
          className="nav nav-pills mb-0 nav-justified bg-white px-3 py-2 border-top border-bottom"
          id="pills-tab"
          role="tablist"
        >
          <Skeleton className={"nav-link"} width={119.33} />
        </ul>
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="bus-details pt-3 pb-0 px-3">
            <div className="info" id="info">
              <h6 className="fw-normal">
                <Skeleton width={50} />
              </h6>
              <p className="text-muted small mb-3">
                <Skeleton count={6} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed-bottom view-seatbt p-3">
        <Skeleton className="osahanbus-btn rounded-1"></Skeleton>
      </div>
    </>
  );
};

export default JourneyDetailsSkeleton;

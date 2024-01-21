import Skeleton from "react-loading-skeleton";

const TicketsSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((card, i) => (
      <div className="bg-white rounded-1 shadow-sm p-3 mb-3 w-100">
        <div className="d-flex align-items-center mb-2">
          <small className="text-muted">
            <Skeleton height={10} width={100} />
          </small>
          <small className="text-success ms-auto f-10">
            <Skeleton width={50} height={10} />
          </small>
        </div>
        <h6 className="mb-3 l-hght-18 fw-bold text-dark">
          <Skeleton height={15} width={130} />
        </h6>

        <div className="row mx-0 mb-3">
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">
              <Skeleton height={10} width={70} />
            </small>
            <p className="small mb-0 l-hght-14">
              <Skeleton height={10} width={150} />
            </p>
          </div>
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">
              <Skeleton height={10} width={30} />
            </small>
            <p className="small mb-0 l-hght-14">
              <Skeleton height={10} width={150} />
            </p>
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">
              <Skeleton height={10} width={100} />
            </small>
            <p className="small mb-0 l-hght-14">
              <Skeleton height={10} width={70} />
            </p>
          </div>
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">
              <Skeleton height={10} width={80} />
            </small>
            <p className="small mb-0 l-hght-14">
              {" "}
              <a className="text-success fw-bold">
                <Skeleton height={10} width={50} />
              </a>
            </p>
          </div>
        </div>
        <div className="row w-100 mt-4">
          <div className="btn ms-auto w-25 pe-3 ">
            <Skeleton height={40} width={90}></Skeleton>
          </div>
        </div>
      </div>
    ));
};

export default TicketsSkeleton;

const Tickets = () => {
  return (
    <div className="your-ticket border-top row m-0 p-3">
      <div className="bg-white rounded-1 shadow-sm p-3 mb-3 w-100">
        <a href="your-ticket.html">
          <div className="d-flex align-items-center mb-2">
            <small className="text-muted">A/C Sleeper (2+1)</small>
            <small className="text-success ms-auto f-10">CONFIRMED</small>
          </div>
          <h6 className="mb-3 l-hght-18 fw-bold text-dark">
            Osahan Travellers ISO 9002- 2009 Certified
          </h6>
        </a>
        <div className="row mx-0 mb-3">
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">GOING FROM</small>
            <p className="small mb-0 l-hght-14"> LUDHIANA</p>
          </div>
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">TO</small>
            <p className="small mb-0 l-hght-14"> GOA</p>
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">DATE OF JOURNEY</small>
            <p className="small mb-0 l-hght-14"> 05 May, 2022</p>
          </div>
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">YOU RATED</small>
            <p className="small mb-0 l-hght-14">
              {" "}
              <a className="text-success fw-bold" href="customer-feedback.html">
                RATE NOW
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-1 shadow-sm p-3 w-100">
        <a href="your-ticket.html">
          <div className="d-flex align-items-center mb-2">
            <small className="text-muted">A/C Sleeper (2+1)</small>
            <small className="text-success ms-auto f-10">CONFIRMED</small>
          </div>
          <h6 className="mb-3 l-hght-18 fw-bold text-dark">
            MANDI Travellers ISO 9002- 2009 Certified
          </h6>
        </a>
        <div className="row mx-0 mb-3">
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">GOING FROM</small>
            <p className="small mb-0 l-hght-14"> LUDHIANA</p>
          </div>
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">TO</small>
            <p className="small mb-0 l-hght-14"> GOA</p>
          </div>
        </div>
        <div className="row mx-0">
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">DATE OF JOURNEY</small>
            <p className="small mb-0 l-hght-14"> 05 May, 2022</p>
          </div>
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pe-1">YOU RATED</small>
            <p className="small mb-0 l-hght-14">
              <span className="icofont-star text-warning"></span> 3.5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tickets;

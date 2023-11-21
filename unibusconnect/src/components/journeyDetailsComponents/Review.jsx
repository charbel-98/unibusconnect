function Review() {
  return (
    <div
      className="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <div className="bus-details pt-3 pb-0 px-3">
        <div className="review" id="review">
          <h6 className="font-weight-normal">Review</h6>
          <p className="mb-0">
            <span className="h4 mb-0">4.8</span>
            <span className="h6">/5</span>
          </p>
          <span className="f-10">Punctuality</span>
          <div className="review-rating row align-items-center">
            <div className="start-rating f-8 col-3">
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
            </div>
            <div className="progress col-7 p-0">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: 100 + "%" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="col-2">
              <span className="small">5.0</span>
            </div>
          </div>
          <div className="review-rating row align-items-center">
            <div className="start-rating f-8 col-3">
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-muted"></i>
            </div>
            <div className="progress col-7 p-0">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: 75 + "%" }}
                aria-valuenow="75"
                aria-valuemin="0"
                aria-valuemax="75"
              ></div>
            </div>
            <div className="col-2">
              <span className="small">4.0</span>
            </div>
          </div>
          <div className="review-rating row align-items-center">
            <div className="start-rating f-8 col-3">
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-muted"></i>
              <i className="icofont-star text-muted"></i>
            </div>
            <div className="progress col-7 p-0">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: 50 + "%" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="50"
              ></div>
            </div>
            <div className="col-2">
              <span className="small">3.0</span>
            </div>
          </div>
          <div className="review-rating row align-items-center">
            <div className="start-rating f-8 col-3">
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-muted"></i>
              <i className="icofont-star text-muted"></i>
              <i className="icofont-star text-muted"></i>
            </div>
            <div className="progress col-7 p-0">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: 25 + "%" }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="25"
              ></div>
            </div>
            <div className="col-2">
              <span className="small">2.0</span>
            </div>
          </div>
          <div className="review-rating row align-items-center">
            <div className="start-rating f-8 col-3">
              <i className="icofont-star text-danger"></i>
              <i className="icofont-star text-muted"></i>
              <i className="icofont-star text-muted"></i>
              <i className="icofont-star text-muted"></i>
              <i className="icofont-star text-muted"></i>
            </div>
            <div className="progress col-7 p-0">
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: 5 + "%" }}
                aria-valuenow="5"
                aria-valuemin="0"
                aria-valuemax="5"
              ></div>
            </div>
            <div className="col-2">
              <span className="small">1.0</span>
            </div>
          </div>
          <div className="comments mt-3">
            <div className="reviews bg-white p-3 shadow-sm rounded-1 mb-3">
              <div className="d-flex align-items-center mb-2">
                <img
                  src="img/review/r1.jpg"
                  className="img-fluid rounded-pill"
                />
                <div className="ml-2">
                  <p className="mb-0 small font-weight-bold">Mike Jhon</p>
                  <div className="start-rating d-flex align-items-center f-8">
                    <i className="icofont-star text-danger"></i>
                    <i className="icofont-star text-danger"></i>
                    <i className="icofont-star text-danger"></i>
                    <i className="icofont-star text-danger"></i>
                    <i className="icofont-star text-muted"></i>
                    <span className="ml-2 small text-danger">Good</span>
                  </div>
                </div>
                <div className="date ml-auto mb-auto small">
                  <small className="f-10">24/03/2021</small>
                </div>
              </div>
              <p className="small text-muted mb-0">
                Dummy comment Lorem ipsum dolor sit amet, consectetur
                adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
            <div className="reviews bg-white p-3 shadow-sm rounded-1 mb-3">
              <div className="d-flex align-items-center mb-2">
                <img
                  src="img/review/r2.jpg"
                  className="img-fluid rounded-pill"
                />
                <div className="ml-2">
                  <p className="mb-0 small font-weight-bold">Mike Jhon</p>
                  <div className="start-rating d-flex align-items-center f-8">
                    <i className="icofont-star text-danger"></i>
                    <i className="icofont-star text-danger"></i>
                    <i className="icofont-star text-muted"></i>
                    <i className="icofont-star text-muted"></i>
                    <i className="icofont-star text-muted"></i>
                    <span className="ml-2 small text-danger">Not Good</span>
                  </div>
                </div>
                <div className="date ml-auto mb-auto small">
                  <small className="f-10">24/03/2020</small>
                </div>
              </div>
              <p className="small text-muted mb-0">
                Not good item for dummy text item Lorem ipsum dolor sit amet,
                consectetur adipisicing elit, tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Review;

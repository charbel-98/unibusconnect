function Pickup() {
  return (
    <div
      class="tab-pane fade"
      id="pills-contact"
      role="tabpanel"
      aria-labelledby="pills-contact-tab"
    >
      <div class="bus-details pt-3 pb-0 px-3">
        <div class="pickpoint" id="pick">
          <div class="bg-white shadow-sm rounded-1 p-3 mb-3">
            <h6 class="border-bottom pb-3 mb-3">Boarding Point Selected</h6>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadiopick1"
                name="customRadiopick1"
                class="custom-control-input"
                checked=""
              />
              <label
                class="custom-control-label small d-flex"
                for="customRadiopick1"
              >
                <p class="h6 mr-4 mb-0">4:30</p>
                <div class="mb-0">
                  <b>Opp. Bus Stand Nilo Poribohon</b> Opp. Bus Stand
                </div>
              </label>
            </div>
          </div>
          <div class="bg-white shadow-sm rounded-1 p-3">
            <h6 class="border-bottom pb-3 mb-3">Droping Point Selected</h6>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="customRadiodrop1"
                name="customRadiodrop1"
                class="custom-control-input"
                checked=""
              />
              <label
                class="custom-control-label small d-flex"
                for="customRadiodrop1"
              >
                <p class="h6 mr-4 mb-0">10:30</p>
                <p class="mb-0">
                  <b>Opp. Bus Stand Chandigarh</b> Opp. Bus Stand
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Pickup;

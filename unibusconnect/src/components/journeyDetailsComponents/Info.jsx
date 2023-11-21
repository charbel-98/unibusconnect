function Info({ sp }) {
  return (
    <div
      className="tab-pane fade show active"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      <div className="bus-details pt-3 pb-0 px-3">
        <div className="info" id="info">
          <h6 className="font-weight-normal">About {sp}</h6>
          <p className="text-muted small mb-3">
            Welcome aboard ST Transportation, where seamless journeys and
            exceptional service converge. As a reputable bus service provider,
            ST Transportation takes pride in connecting students to
            universities, ensuring a reliable and comfortable travel experience.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Info;

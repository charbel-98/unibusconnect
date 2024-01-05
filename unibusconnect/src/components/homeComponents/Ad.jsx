function Ad({ title, img }) {
  const splittedTitle = title.split(" ");
  return (
    <div className="col-6 py-1 pe-1 ps-0">
      <div className="p-3 bg-white shadow-sm rounded-1">
        <img className="img-fluid" src={img} alt="" />
        <p className="mb-0 mt-4 fw-bold">
          {`${splittedTitle[0]} ${splittedTitle[1]}`}
          <br />
          {`${splittedTitle[2]} ${splittedTitle[3] || ""}`}
        </p>
      </div>
    </div>
  );
}
export default Ad;

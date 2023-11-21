function FromToTextBox({ from, to }) {
  return (
    <div className="p-2 border-bottom w-100">
      <div className="bg-white border border-warning rounded-1 shadow-sm p-2">
        <div className="row mx-0 px-1">
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pr-1">GOING FROM</small>
            <p className="small mb-0"> {from}</p>
          </div>
          <div className="col-6 p-0">
            <small className="text-muted mb-1 f-10 pr-1">GOING TO</small>
            <p className="small mb-0"> {to}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FromToTextBox;

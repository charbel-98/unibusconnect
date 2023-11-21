function DateInput() {
  return (
    <div className="form-group border-bottom pb-1">
      <label htmlFor="date" className="mb-2">
        <span className="icofont-ui-calendar text-danger"></span> Date
      </label>
      <br />
      <input name="date" className="form-control border-0 p-0" type="date" />
    </div>
  );
}
export default DateInput;

import "bootstrap/dist/css/bootstrap.min.css";
import "../../style.scss";
import { useState } from "react";
const FormInput = ({
  type,
  label,
  placeholder,
  id,
  value,
  onChange,
  onBlur,
  errorMessage,
  isValid,
  touched,
  isSignUp,
}) => {
  return (
    <div className="form-group mb-3 ">
      <label className="text-muted f-10 mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className={`form-control ${!isValid && touched && "is-invalid"} ${
          isValid && touched && "is-valid"
        } `}
      />
      {errorMessage && <p className="text-danger small">{errorMessage}</p>}
    </div>
  );
};
export default FormInput;

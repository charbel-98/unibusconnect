import { Facebook, Google } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoogleUser } from "../../redux/auth/authSlice";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/auth/authSlice";
import axios from "axios";
function OAuth({ platform }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectToGoogleSSO = async () => {
    window.open("http://localhost:3000/api/v1/auth/google", "_self");
  };

  return (
    <button
      onClick={redirectToGoogleSSO}
      className={`btn  rounded-1 ${platform}-btn py-auto form-group osahanbus-social my-2`}
    >
      {platform === "facebook" ? (
        <Facebook size={18} className=" me-2" />
      ) : (
        <Google size={18} className=" me-2" />
      )}{" "}
      LOGIN WITH
      {" " + platform.toUpperCase()}
    </button>
  );
}
export default OAuth;

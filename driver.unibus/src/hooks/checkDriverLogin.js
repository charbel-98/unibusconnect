import { useDispatch } from "react-redux";
import axios from "../api/axios";
import useAuth from "./useAuth";
import { setAuth } from "../redux/auth/authSlice";

const checkDriverLogin = (controller) => {
  const dispatch = useDispatch();
  const check = async ({ accessToken, refreshToken }) => {
    let response;
    try {
      response = await axios.get("/driverLogin", {
        withCredentials: true,
        headers: {
          "Authorization": `Bearer ${refreshToken}`,
        },
        params: {
          accessToken,
          refreshToken,
        },
        signal: controller.signal,
      });
    } catch (error) {
      console.log(error);
    }
    if (response) {
      dispatch(
        setAuth({
          accessToken: response?.data?.accessToken,
          user: response?.data?.user,
        })
      );
      console.log(response?.data?.accessToken);
    }

    return response?.data?.accessToken;
  };
  return check;
};

export default checkDriverLogin;

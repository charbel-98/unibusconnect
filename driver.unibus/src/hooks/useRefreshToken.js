import { useDispatch } from "react-redux";
import axios from "../api/axios";
import useAuth from "./useAuth";
import { setAuth } from "../redux/auth/authSlice";

const useRefreshToken = (controller) => {
  const dispatch = useDispatch();
  const refresh = async () => {
    let response;
    try {
      response = await axios.get("/refresh", {
        withCredentials: true,
        signal: controller.signal,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch(
      setAuth({
        accessToken: response?.data?.accessToken,
        user: response?.data?.user,
      })
    );
    console.log(response?.data?.accessToken);

    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

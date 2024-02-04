import { useSelector, useDispatch } from "react-redux";
const useAuth = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  // Assuming setAccessToken is your  creator

  return { auth: accessToken };
};

export default useAuth;

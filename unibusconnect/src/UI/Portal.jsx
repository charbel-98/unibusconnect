import { useDispatch } from "react-redux";
import classes from "./portal.module.css";
import { close } from "../redux/sideBarSlice";
const Portal = () => {
  const dispatch = useDispatch();
  return (
    <div
      className={`${classes.portal}`}
      onClick={() => {
        dispatch(close());
      }}
    ></div>
  );
};
export default Portal;

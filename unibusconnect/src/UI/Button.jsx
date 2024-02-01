import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./button.module.css";
const Button = (props) => {
  return (
    <button
      className={`btn  ${props.classes}  mb-3 rounded-1  ${classes.customBtn}`}
      type={props.type}
      onClick={props.onNavigate}
    >
      {props.children}
    </button>
  );
};
export default Button;

import "bootstrap/dist/css/bootstrap.min.css";
import image from "../img/bus-login.svg";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const navigateSignup = () => {
    return navigate("/signup");
  };
  const navigateLogin = () => {
    return navigate("/login");
  };
  return (
    <div className="py-4 d-flex align-items-center justify-content-center">
      <div className="pt-2 text-center">
        <img src={image} />
        <div className="head py-4 px-4 text-center">
          <h5 className="fw-bold mb-4">Start by creating an account.</h5>
          <p className="text-muted">
            Hop aboard the future of hassle-free travel
            <br /> sign up now and unlock the gateway to effortless bus
            ticketing designed just for you.
          </p>
        </div>
        <div className="fixed-bottom p-4">
          <Button classes="btn-danger" onNavigate={navigateSignup}>
            CREATE AN ACCOUNT
          </Button>
          <Button classes="btn-light" onNavigate={navigateLogin}>
            SIGN IN
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Welcome;

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import FormInput from "../components/authComponents/FormInput";
import AuthHeader from "../components/authComponents/AuthHeader";
import Or from "../components/authComponents/Or";
import OAuth from "../components/authComponents/OAuth";

const Login = () => {
  return (
    <div className="osahan-signup">
      <div className="px-3 pt-3 pb-5">
        <form>
          <FormInput
            type="text"
            label="Mobile Number"
            placeholder="Enter a mobile number"
            id="mobile"
          />

          <FormInput
            type="email"
            label="Your email"
            placeholder="Enter Your Email"
            id="email"
          />

          <FormInput
            type="password"
            label="Password"
            placeholder="Enter Your Password"
            id="password"
          />

          <div className="text-right mb-3">
            <Link href="change-password.html" className="text-muted small">
              Forgot your password?
            </Link>
          </div>
          <Button type="submit" classes="bg-danger mb-4">
            SIGN IN
          </Button>
        </form>
        <Or></Or>
        <OAuth platform="google" />
        <OAuth platform="facebook" />
        <div className="osahan-signin text-center p-1">
          <p className="m-0">
            Not a member?
            <Link to="/signup" className="text-danger ms-2">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;

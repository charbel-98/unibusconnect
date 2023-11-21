import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../UI/Button";
import FormInput from "../components/authComponents/FormInput";
import Or from "../components/authComponents/Or";
import PasswordStrengthBar from "react-password-strength-bar";
import OAuth from "../components/authComponents/OAuth";
import useInput from "../hooks/useInput";
import { login, signup } from "../redux/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const SignUp = ({ isSignUp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const from = location.state?.from?.pathname || "/";
  const {
    value: name,
    isValid: nameIsValid,
    errorMessage: nameErrorMessage,
    touched: nameTouched,
    onChange: nameChangeHandler,
    onBlur: nameBlurHandler,
  } = useInput({
    validator: (value) => {
      const splitName = value.trim().split(" ");
      const valid = splitName[0].length > 2 && splitName[1]?.length > 2;
      return valid;
    },
    required: true,
    message:
      "please enter a valid name, first name and last name must be at least 3 characters",
  });
  const {
    value: mobile,
    isValid: mobileIsValid,
    errorMessage: mobileErrorMessage,
    touched: mobileTouched,
    onChange: mobileChangeHandler,
    onBlur: mobileBlurHandler,
  } = useInput({
    validator: (value) => {
      const regex =
        /(?:\+961|961)?(1|0?3[0-9]?|[4-6]|70|71|76|78|79|7|81?|9)\d{6}/;
      return regex.test(value.trim());
    },
    required: true,
    message: "please enter a valid phone number",
  });

  const {
    value: email,
    isValid: emailIsValid,
    errorMessage: emailErrorMessage,
    touched: emailTouched,
    onChange: emailChangehandler,
    onBlur: emailBlurhandler,
  } = useInput({
    validator: (value) => {
      const regex = /[\w]*@*[a-z]*\.*[\w]{5,}(\.)*(com)*(@gmail\.com)/;
      return regex.test(value.trim());
    },
    required: true,
    message: "please enter a valid email",
  });
  const {
    value: password,
    isValid: passwordIsValid,
    errorMessage: passwordErrorMessage,
    touched: passwordTouched,
    onChange: passwordChangeHandler,
    onBlur: passwordBlurHandler,
  } = useInput({
    validator: (value) => {
      const regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      return regex.test(value.trim());
    },
    required: true,
    message:
      "Password must be at least 8 digits, one special character, one uppercase and one number",
  });
  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    errorMessage: confirmPasswordErrorMessage,
    touched: confirmPasswordTouched,
    onChange: confirmPasswordChangeHandler,
    onBlur: confirmPasswordBlurHandler,
  } = useInput({
    validator: (value) => value.trim() === password,
    required: true,
    message: "Password did not match!",
  });
  const {
    value: mobileOrEmail,
    isValid: mobileOrEmailIsValid,
    errorMessage: mobileOrEmailErrorMessage,
    touched: mobileOrEmailTouched,
    onChange: mobileOrEmailChangeHandler,
    onBlur: mobileOrEmailBlurHandler,
  } = useInput({
    validator: (value) => {
      const mobileRegex =
        /(?:\+961|961)?(1|0?3[0-9]?|[4-6]|70|71|76|78|79|7|81?|9)\d{6}/;
      const emailRegex = /[\w]*@*[a-z]*\.*[\w]{5,}(\.)*(com)*(@gmail\.com)/;
      return mobileRegex.test(value.trim()) || emailRegex.test(value.trim());
    },
    required: true,
    message: "Phone number or email must be valid",
  });
  const signupFormIsValid =
    mobileIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid;
  const loginFormIsValid = mobileOrEmailIsValid && passwordIsValid;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (signupFormIsValid) {
        await dispatch(signup({ name, mobile, email, password }));
      }
    } else if (loginFormIsValid) {
      await dispatch(login(JSON.stringify({ mobileOrEmail, password })));
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="osahan-signup">
      <div className="p-3">
        <form onSubmit={submitHandler}>
          {isSignUp && (
            <FormInput
              type="text"
              label="Full name"
              placeholder="Enter Your first and last name"
              id="name"
              value={name}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              errorMessage={nameErrorMessage}
              isValid={nameIsValid}
              touched={nameTouched}
            />
          )}
          <FormInput
            type="text"
            label={isSignUp ? "Phone Number" : "Phone number or Email"}
            placeholder={
              isSignUp ? "Enter a mobile number" : "Enter Phone number or Email"
            }
            id="mobile"
            onChange={
              isSignUp ? mobileChangeHandler : mobileOrEmailChangeHandler
            }
            onBlur={isSignUp ? mobileBlurHandler : mobileOrEmailBlurHandler}
            value={isSignUp ? mobile : mobileOrEmail}
            errorMessage={
              isSignUp ? mobileErrorMessage : mobileOrEmailErrorMessage
            }
            isValid={isSignUp ? mobileIsValid : mobileOrEmailIsValid}
            touched={isSignUp ? mobileTouched : mobileOrEmailTouched}
          />

          {isSignUp && (
            <FormInput
              type="email"
              label="Your email"
              placeholder="Enter Your Email"
              id="email"
              value={email}
              onChange={emailChangehandler}
              onBlur={emailBlurhandler}
              errorMessage={emailErrorMessage}
              isValid={emailIsValid}
              touched={emailTouched}
            />
          )}

          <FormInput
            type="password"
            label="Password"
            placeholder="Enter Your Password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            errorMessage={passwordErrorMessage}
            isValid={passwordIsValid}
            touched={passwordTouched}
          />
          {isSignUp && (
            <>
              <PasswordStrengthBar password={password} />
              <FormInput
                type="password"
                label="Confirm Password"
                placeholder="Enter Your Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
                errorMessage={confirmPasswordErrorMessage}
                isValid={confirmPasswordIsValid}
                touched={confirmPasswordTouched}
              />
            </>
          )}

          <Button type="submit" classes="bg-danger text-light">
            {isSignUp ? "CREATE AN ACCOUNT" : "LOG IN"}
          </Button>
          <p className="text-muted text-center small">
            By signing up you agree to our Privacy Policy and Terms.
          </p>
        </form>
        <Or />
        <OAuth platform="google" />
        <OAuth platform="facebook" />
        {!isSignUp && (
          <div className="osahan-signin text-center p-1">
            <p className="m-0">
              Not a member?
              <Link to="/signup" className="text-danger ms-2">
                Sign Up
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SignUp;

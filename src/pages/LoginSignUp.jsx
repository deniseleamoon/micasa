import PropTypes from "prop-types";
import { useState } from "react";
import "./LoginSignUp.css";

const LoginSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  return (
    <form action="">
      <div className="loginSignUp">
        <div className="loginSignUpContainer">
          <h1 className="signUpLogin">Sign Up</h1>
          <div className="loginSignUpFields">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={handleName}
              aria-label="Enter your name"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleEmail}
              aria-label="Enter your email"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
              aria-label="Enter your password"
            />
          </div>
          <button type="submit">Continue</button>
          <p className="loginSignUp-login">
            Already have an account? <span>Login Here</span>
          </p>
          <div className="loginSignUpAgree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
          </div>
        </div>
      </div>
    </form>
  );
};
LoginSignUp.protoTypes = {
  onsubmit: PropTypes.func.isRequired,
};

export default LoginSignUp;

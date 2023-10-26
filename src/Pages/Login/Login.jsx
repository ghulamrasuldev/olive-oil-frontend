import React, { useState } from "react";
import "./Style.scss";
import Logo from "../../assets/icons/logo.png";
import Eye from "../../assets/icons/eye.png";
import { Link, Outlet } from "react-router-dom";
import { ErrorMessage, SuccessMessage } from "../../Helper/Message";
import apiService from "../../Services/apiService";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateUser,
  notAuthenticateUser,
} from "../../Redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    phone: "",
    password: "",
  });
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState("");

  const gotoDashboard = () => {
    navigate("/dashboard", { replace: true });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPhoneNumberValid && (strength === "strong" || strength === "good")) {
      try {
        // Send the login request to the backend
        const response = await apiService(
          "POST",
          "/auth/login",
          {},
          credentials
        );
        const authToken = response.authToken;
        const UserName = response.validUser.name;
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userName", UserName);

        if (authToken) {
          dispatch(authenticateUser());
          setStrength("");
          SuccessMessage(response.message);
          gotoDashboard();
          setCredentials({
            phone: "",
            password: "",
          });
        } else {
          ErrorMessage("Invalid login credentials");
        }
      } catch (error) {
        ErrorMessage(` APi Error ${error}`);
        console.log(error);
      }
    } else {
      ErrorMessage("Invalid phone or password. Please check your inputs.");
    }
  };

  const validatePhoneNumber = (inputPhoneNumber) => {
    const phonePattern = /^[0-9]{7,15}$/; // Example pattern for a 10-digit phone number

    return phonePattern.test(inputPhoneNumber);
  };

  const checkPasswordStrength = (inputPassword) => {
    const lengthScore = inputPassword.length >= 8 ? 1 : 0;
    const uppercaseScore = /[A-Z]/.test(inputPassword) ? 1 : 0;
    const lowercaseScore = /[a-z]/.test(inputPassword) ? 1 : 0;
    const numberScore = /[0-9]/.test(inputPassword) ? 1 : 0;
    const specialCharScore = /[^A-Za-z0-9]/.test(inputPassword) ? 1 : 0;

    const totalScore =
      lengthScore +
      uppercaseScore +
      lowercaseScore +
      numberScore +
      specialCharScore;

    if (totalScore <= 2) {
      return "poor";
    } else if (totalScore <= 4) {
      return "good";
    } else {
      return "strong";
    }
  };
  const getColor = (strengthLevel) => {
    switch (strengthLevel) {
      case "poor":
        return "red";
      case "good":
        return "orange";
      case "strong":
        return "green";
      default:
        return "rgba(144, 166, 123, 1)";
    }
  };

  const handlePhone = (e) => {
    const phoneValue = e.target.value;
    setCredentials({
      ...credentials,
      phone: phoneValue,
    });
    setIsPhoneNumberValid(validatePhoneNumber(phoneValue));
  };
  const handlePassword = (e) => {
    const passValue = e.target.value;
    setCredentials({
      ...credentials,
      password: passValue,
    });
    setStrength(checkPasswordStrength(passValue));
  };

  return (
    <div className="mainContainer">
      <div className="login">
        <div className="form">
          <div className="logoDiv">
            <img src={Logo} alt="logo" />
          </div>
          <div className="inputFields">
            <h2>Welcome To Login Page</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputDiv">
                <div className="labelAnderror">
                  <label htmlFor="phone">Phone</label>
                  {!isPhoneNumberValid && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "normal",
                      }}
                    >
                      please enter valid phone
                    </p>
                  )}
                </div>
                <input
                  type="text"
                  id="phone"
                  value={credentials.phone}
                  placeholder="Enter your Phone Number"
                  onChange={(e) => handlePhone(e)}
                  style={{
                    border: isPhoneNumberValid
                      ? "1px solid rgba(144, 166, 123, 1)"
                      : "1px solid red",
                  }}
                />
              </div>
              <div className="inputDiv">
                <div className="labelAnderror">
                  <label htmlFor="password">Password</label>
                  <p
                    style={{
                      color: getColor(strength),
                      fontSize: "12px",
                      fontWeight: "normal",
                    }}
                  >
                    {strength}
                  </p>
                </div>
                <div
                  className="passwordDiv"
                  style={{ border: `1px solid ${getColor(strength)}` }}
                >
                  <input
                    type={showPass ? "text" : "password"}
                    id="password"
                    value={credentials.password}
                    placeholder="Enter your password"
                    onChange={(e) => handlePassword(e)}
                  />
                  <img
                    src={Eye}
                    alt="passwordShow"
                    onClick={() => setShowPass(!showPass)}
                  />
                </div>
              </div>
              <Link to="/forget">Forget Password?</Link>
              <input type="submit" value="Login" className="submit" />
            </form>
            <p>
              {" "}
              Don’t have an account yet?{" "}
              <Link to="/signup">Register for free</Link>
            </p>
          </div>
        </div>
        <div className="imgDiv">
          <div className="textDiv">
            <h2>ARABELLA MILLS</h2>
            <p>
              Olive oil is a liquid fat obtained by pressing whole olives, the
              fruit of Olea europaea, a traditional tree crop of the
              Mediterranean Basin, and extracting the oil.
            </p>
          </div>
        </div>
          </div>
    </div>
  );
};

export default Login;

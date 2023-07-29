// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAdminLoggedIn, setIsStudentLoggedIn }) => {
  const [studentId, setstudentId] = useState("");
  const [password, setPassword] = useState("");

  // for admin login
  //const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // need to add logic to handle login authentication here : admin logic has been added.
    // need to replace "adminid" and "adminpass" with the actual admin credentials
    if (studentId === "adminid" && password === "adminpass") {
      // setLoggedIn(true);
      setIsAdminLoggedIn(true);
      navigate("/adminDashboard");
    } else if (studentId == "20203038") {
      //  studentId.trim() !== ''
      // setLoggedIn(true) ;
      setIsStudentLoggedIn(true);

      navigate("/studentDashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-box">
        <div className="login-logo">
          <div className="logo"></div>
        </div>
        <div className="login-box1">
          <h2>Login Here</h2>
          <form onSubmit={handleLogin}>
            <div className="login-box2">
              <p> User ID </p>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setstudentId(e.target.value)}
                required
              />
            </div>
            <div>
              <p>Password </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="submit-button">
              <button type="submit">Login</button>
              <p>Forget password?</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

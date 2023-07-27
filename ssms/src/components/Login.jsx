// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setIsAdminLoggedIn , setIsStudentLoggedIn}) => {
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
      setIsAdminLoggedIn(true) ;
      navigate("/adminDashboard");
    }
    else if (studentId == "20203038") {  //  studentId.trim() !== ''
      // setLoggedIn(true) ;
      setIsStudentLoggedIn(true) ;

      navigate('/studentDashboard'); 
      
    }
    else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label> ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setstudentId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;


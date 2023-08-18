// src/components/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";

const Login = ({ setIsAdminLoggedIn, setIsStudentLoggedIn }) => {
  const [studentId, setstudentId] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null); // Store user data

  // for admin login
  //const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Make an API request to authenticate the user
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId, password }),
      });
  
      if (response.ok) {
        const userData = await response.json();
  
        // Check if the user is approved
        if (userData.isApproved) {
          if (studentId === 'adminid') {
            setIsAdminLoggedIn(true);
            navigate('/adminDashboard');
          } else {
            setIsStudentLoggedIn(true);
            localStorage.setItem('isStudentLoggedIn', true);
            navigate('/studentDashboard', {
              state: {
                name: userData.name,
                studentId: userData.studentId,
                semester: userData.semester,
                hasVoted: userData.hasVoted,
              },
            });
          }
        } else {
          alert('User is not approved. Please wait for approval.');
        }
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
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

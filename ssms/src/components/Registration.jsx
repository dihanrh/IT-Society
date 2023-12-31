// src/components/Registration.js

import React, { useState } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";

const Registration = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [semester, setSemester] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isApproved, setIsApproved] = useState(false); // check reg approval status
  const [isSubmiOK, setIsSubmitOk] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.REGISTRATION}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            studentId,
            semester,
            email,
            password,
            isApproved,
          }), // Send registration data
        }
      );

      console.log("Response:", response);

      if (response.ok) {
        console.error("Registration successful");
        setIsSubmitOk("ok");
      } else {
        // Handle registration error
        console.error("Failed to register");
        setIsSubmitOk("error");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className='ThisForm' >
        {isSubmiOK == "ok" && (
          <div>
            <h1>Registration has been Submitted.</h1>
            <h1>Please wait for the approval</h1>
          </div>
        )}

        {isSubmiOK == "error" && (
          <div>
            <h2>Error : user id is not available</h2>
            <Registration />
          </div>
        )}

        {isSubmiOK == null && (
          <div>
            <h2>Student Registration</h2>
            <form onSubmit={handleRegister}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Student ID:</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Semester:</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                
                </select>
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <button className="buttonG" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Registration;

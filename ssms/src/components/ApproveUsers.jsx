import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';

const ApproveUsers = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [approvedRegistrations, setApprovedRegistrations] = useState([]);

  useEffect(() => {
    // Fetch pending registrations from the API where isApproved is false
    fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTRATION}?isApproved=false`)
      .then(response => response.json())
      .then(data => setPendingRegistrations(data))
      .catch(error => console.error('Error fetching pending registrations:', error));
  }, []);

  useEffect(() => {
    // Fetch approved registrations from the API where isApproved is true
    fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTRATION}?isApproved=true`)
      .then(response => response.json())
      .then(data => setApprovedRegistrations(data))
      .catch(error => console.error('Error fetching pending registrations:', error));
  }, []);



  const handleApproval = (id) => {
    
    // Send an API request to mark the registration as approved
    fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTRATION}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isApproved: true }), // Update isApproved to true to mark as approved
    })
      .then(response => response.json())
      .then(data => {
        // Remove the approved registration from pendingRegistrations and add to approvedRegistrations
        const approvedRegistration = pendingRegistrations.find(reg => reg.id === id);
        if (approvedRegistration) {
          setPendingRegistrations(prevRegistrations =>
            prevRegistrations.filter(reg => reg.id !== id)
            
          );
          setApprovedRegistrations(prevRegistrations => [...prevRegistrations, approvedRegistration]);
        }
      })
      .catch(error => console.error('Error approving registration:', error));
  };

  return (
    <>
      <div>
        <h2>Approved Users</h2>
      
        <ul>
          {approvedRegistrations.map(reg => (
            <li key={reg.id}>
              <p>Name: {reg.name}</p>
              <p>Student ID: {reg.studentId}</p>
              <p>Semester: {reg.semester}</p>
              <p>Email: {reg.email}</p>
              <p>MID : {reg._id.toString()}</p>
            
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Pending To Approve</h2>
        <ul>
          {pendingRegistrations.map(reg => (
            <li key={reg.id}>
              <p>Name: {reg.name}</p>
              <p>Student ID: {reg.studentId}</p>
              <p>Semester: {reg.semester}</p>
              <p>Email: {reg.email}</p>
              <button onClick={() => handleApproval(reg._id.toString())}>Approve</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ApproveUsers;

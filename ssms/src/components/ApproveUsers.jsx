import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';

const ApproveUsers = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [approvedRegistrations, setApprovedRegistrations] = useState([]);

  useEffect(() => {
    // Fetch pending registrations from the API where __v = 0
    fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTRATION}?__v=0`)
      .then(response => response.json())
      .then(data => setPendingRegistrations(data))
      .catch(error => console.error('Error fetching pending registrations:', error));
  }, []);

  const handleApproval = (id) => {
    // Send an API request to mark the registration as approved
    fetch(`${API_BASE_URL}${API_ENDPOINTS.REGISTRATION}/${id}`, {
      method: 'PUT', // Use PUT request to update the registration
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ __v: 1 }), // Update __v to 1 to mark as approved
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
              <button onClick={() => handleApproval(reg.id)}>Approve</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ApproveUsers;

// src/components/ApproveUsers.js

import React, { useState } from 'react';

const ApproveUsers = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);

  // Replace this with actual logic to fetch pending registrations from the server
  // For demonstration purposes, we are using a sample array
  const samplePendingRegistrations = [
    {
      id: 1,
      name: "Rakibul Hasan Dihan",
      studentId: "20203038",
      semester: "10",
      email: "20203038@iubat.com",
    },
    {
      id: 2,
      name: "Israt Jahan Mim",
      studentId: "20203053",
      semester: "10",
      email: "20203053@iubat.com",
    },
    {
      id: 3,
      name: "Kazi Johir Raihan Suny",
      studentId: "20203022",
      semester: "10",
      email: "20203022@iubat.com",
    },
    {
      id: 4,
      name: "Samiha Maisha Jeba",
      studentId: "20203017",
      semester: "10",
      email: "20203017@iubat.com",
    },
    // Add more pending registrations here
  ];

  const handleApproval = (id) => {
    // Add your logic to approve the registration with the given ID
    // For this example, we will find the registration in the pendingRegistrations array and remove it
    const approvedRegistration = pendingRegistrations.find(
      (reg) => reg.id === id
    );

    // Here you may want to send an API request to the server to mark the registration as approved
    // Once the registration is approved on the server, you can remove it from the list
    if (approvedRegistration) {
      setPendingRegistrations((prevRegistrations) =>
        prevRegistrations.filter((reg) => reg.id !== id)
      );
    }
  };

  return (
    <div>
      <h2>Approve Users</h2>
      <ul>
        {pendingRegistrations.map((reg) => (   // to view sample : samplePendingRegistrations
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
  );
};

export default ApproveUsers;

// src/components/AdminDashboard.js

import React, { useState } from "react";
import HomeMenu from "./HomeMenu";

const AdminDashboard = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);

  // Replace this with actual logic to fetch pending registrations from the server
  // For demonstration purposes, we are using a sample array
  const samplePendingRegistrations = [
    {
      id: 20203038,
      name: "Rakibul Hasan Dihan",
      studentId: "20203038",
      semester: "10",
      email: "20203038@iubat.com",
    },
    {
      id: 20203053,
      name: "Israt Jahan Mim",
      studentId: "20203053",
      semester: "10",
      email: "20203053@iubat.com",
    },
    // Add more pending registrations here
  ];

  const handleApproval = (id) => {
    // Add your logic to approve the registration with the given ID
    // You may need to make an API call to update the status on the server
    // For this example, we will simply remove the registration from the list
    setPendingRegistrations((prevRegistrations) =>
      prevRegistrations.filter((reg) => reg.id !== id)
    );
  };

  return (
    <div>
      <HomeMenu isAdmin={true} />
      <h2>Admin Dashboard</h2>

      <h3>Pending Registrations</h3>
      <ul>
        {pendingRegistrations.map((reg) => (
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

export default AdminDashboard;

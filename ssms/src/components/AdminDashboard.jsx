// src/components/AdminDashboard.js

import React, { useState } from "react";
import CreateElection from "./CreateElection";

const AdminDashboard = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);

  // Replace this with actual logic to fetch pending registrations from the server
  // For demonstration purposes, we are using a sample array
  

  const handleApproval = (id) => {
    // Add your logic to approve the registration with the given ID
    // You may need to make an API call to update the status on the server
    // For this example, we will simply remove the registration from the list
    setPendingRegistrations((prevRegistrations) =>
      prevRegistrations.filter((reg) => reg.id !== id)
    );
  };

  // pros driling 

  return (
    <div>
    
      <h2>Admin Dashboard</h2>
     
    </div>
  );
};

export default AdminDashboard;

// src/components/StudentDashboard.js


import React from 'react';
import { useLocation } from 'react-router-dom';

const StudentDashboard = () => {
  const location = useLocation();
  const { name, studentId, semester } = location.state || {};

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Name: {name}</p>
      <p>Student ID: {studentId}</p>
      <p>Semester: {semester}</p>
    </div>
  );
};

export default StudentDashboard;

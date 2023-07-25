// src/components/StudentDashboard.js

import React from 'react';

const StudentDashboard = ({ name, studentId, semester }) => {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Name: {name}</p>
      <p>Student ID: {studentId}</p>
      <p>Semester: {semester}</p>
      {/* You can add more information or components specific to the student dashboard */}
    </div>
  );
};

export default StudentDashboard;

import React, { useState, useEffect } from "react";
import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";

const MentoringClassList = () => {
  const [mentoringClasses, setMentoringClasses] = useState([]);

  useEffect(() => {
    // Fetch mentoring classes data from the server
    const fetchMentoringClasses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COURSE}`);
        if (!response.ok) {
          throw new Error("Failed to fetch mentoring classes data");
        }
        const data = await response.json();
        setMentoringClasses(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching mentoring classes:", error);
      }
    };

    fetchMentoringClasses();
  }, []);

  return (
    <div>
      <h2>Mentoring Class List</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Date and Time</th>
            <th>Room Number</th>
            <th>Mentor Name</th>
            <th>Mentor Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {mentoringClasses.map((mentoringClass) => (
            <tr key={mentoringClass._id}>
              <td>{mentoringClass.courseName}</td>
              <td>{mentoringClass.courseCode}</td>
              <td>{mentoringClass.dateTime}</td>
              <td>{mentoringClass.roomNumber}</td>
              <td>{mentoringClass.mentorName}</td>
              <td>{mentoringClass.mentorPhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MentoringClassList;

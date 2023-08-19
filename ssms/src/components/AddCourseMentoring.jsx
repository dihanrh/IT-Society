import React, { useState } from "react";
import MentoringClassList from "./MentoringClassList";
import { API_BASE_URL, API_ENDPOINTS } from "../utils/config";


const AddCourseForm = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseCode:"",
    dateTime: "",
    roomNumber: "",
    mentorName: "",
    mentorPhoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COURSE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        console.log("Course added successfully");
        // Optionally, reset the form or show a success message
      } else {
        console.error("Failed to add course");
        // Handle error: show error message or log
      }
    } catch (error) {
      console.error("Error adding course:", error);
      // Handle error: show error message or log
    }
  };

  return (
   <>
   <div>
    <MentoringClassList/>
   </div>
   <div className="add-course-form">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <ul className="form-list">
          <li>
            <label>
              Course Name:
              <input
                type="text"
                name="courseName"
                value={courseData.courseName}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Course Code:
              <input
                type="text"
                name="courseCode"
                value={courseData.courseCode}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Date and Time:
              <input
                type="datetime-local"
                name="dateTime"
                value={courseData.dateTime}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Room Number:
              <input
                type="text"
                name="roomNumber"
                value={courseData.roomNumber}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Mentor Name:
              <input
                type="text"
                name="mentorName"
                value={courseData.mentorName}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label>
              Mentor Phone Number:
              <input
                type="tel"
                name="mentorPhoneNumber"
                value={courseData.mentorPhoneNumber}
                onChange={handleChange}
              />
            </label>
          </li>
        </ul>
        <button type="submit">Save</button>
      </form>
    </div>
   </>
  );
};

export default AddCourseForm;

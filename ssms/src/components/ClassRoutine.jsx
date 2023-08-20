
import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';

const ClassRoutine = () => {
  const [numCourses, setNumCourses] = useState(0);
  const [courseDropdowns, setCourseDropdowns] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    // Fetch the list of courses from the server
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.COURSE}`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const courses = await response.json();
        setCourseDropdowns(courses.map(course => course.courseName));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleNumCoursesChange = (event) => {
    const num = parseInt(event.target.value);
    setNumCourses(num);
    setSelectedCourses(new Array(num).fill(''));
    setCourseDetails(null);
  };

  const handleDropdownChange = (event, index) => {
    const selected = event.target.value;
    setSelectedCourses(prevSelected => {
      const newSelected = [...prevSelected];
      newSelected[index] = selected;
      return newSelected;
    });
  };

  const handleShowRoutine = async () => {
    if (selectedCourses.some(course => course === '')) {
      return;
    }

    try {
      const courseDetailsArray = [];
      for (const selectedCourse of selectedCourses) {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ROUTINE}/${selectedCourse}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const courseDetail = await response.json();
        courseDetailsArray.push(courseDetail);
      }
      setCourseDetails(courseDetailsArray);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  return (
  <>
    <div className='ThisForm'>
      <h1>Mentoring Class Routine</h1>
      <div>
        <label>Number of Courses: </label>
        <input type="number" value={numCourses} onChange={handleNumCoursesChange} />
        <button onClick={handleShowRoutine}>Next</button>
      </div>
      {numCourses > 0 && (
        <div>
          {selectedCourses.map((selectedCourse, index) => (
            <div key={index}>
              <select value={selectedCourse} onChange={(event) => handleDropdownChange(event, index)}>
                <option value="">Select a course</option>
                {courseDropdowns.map((course, index) => (
                  <option key={index} value={course}>{course}</option>
                ))}
              </select>
            </div>
          ))}
          <button onClick={handleShowRoutine}>Show Routine</button>
        </div>
      )}

      </div>
      <div>
      {courseDetails && (
       
        <div>
           <h2>Course Details</h2>
          <div className='file-sharingA'>
          
          {courseDetails.map((course, index) => (
            <div key={index} className='fileA'>
              <h3>Course {index + 1}</h3>
              <p>Course Name: {course.courseName}</p>
              <p>Course Code: {course.courseCode}</p>
              <p>Date & Time: {course.dateTime}</p>
              <p>Room Number: {course.roomNumber}</p>
              <p>Mentor Name: {course.mentorName}</p>
              <p>Mentor Phone:{course.mentorPhoneNumber}</p>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  </>
  );
};

export default ClassRoutine;



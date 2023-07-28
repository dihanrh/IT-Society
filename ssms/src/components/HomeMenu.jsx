import React, { useState } from "react";
import { Link } from "react-router-dom";



const ElectionDropdown = () => {
  // State to manage the visibility of the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="dropdown">
      {/* Election button */}
      <button onClick={toggleDropdown}>Election</button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <ul>
          <li>
            <Link to="/createElection">Create Election</Link>
          </li>
          <li>
            <Link to="/currentElections">Current Elections</Link>
          </li>
          <li>
            <Link to="/disableEVoting">Disable E-Voting</Link>
          </li>
          <li>
            <Link to="/publishResult">Publish Result</Link>
          </li>
        </ul>
      )}
    </div>
  );
};



const HomeMenu = ({ isAdminLoggedIn, isStudentLoggedIn }) => {
  return (
    <>
      <nav>
        <ul>
          {/* Common menu items for all users */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/notice">Notice</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>

          {/* Menu items based on user role */}
          {isAdminLoggedIn && (
            <>
              <li>
                <Link to="/approveUsers">Approve Users</Link>
              </li>
            
              <li>
                <Link to="/logout">Log out</Link>
              </li>
            </>
          )}

          {isStudentLoggedIn && (
            <>
              <li>
                <Link to="/vote">Vote</Link>
              </li>
              <li>
                <Link to="/wings">Wings</Link>
              </li>
              <li>
                <Link to="/fileSharing">File Sharing</Link>
              </li>
              <li>
                <Link to="/logout">Log out</Link>
              </li>
            </>
          )}

          {/* Show login and registration for non-logged in users */}

          {/* Non reg User */}
          {!isAdminLoggedIn && !isStudentLoggedIn && (
            <>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default HomeMenu;

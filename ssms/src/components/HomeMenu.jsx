import React from "react";
import { Link } from "react-router-dom";

const HomeMenu = ({ isAdmin }) => {
  return (
    <>
      <nav>
        <ul>
          {!isAdmin && (
            <>
              {/* Add other buttons for non-admin users */}
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/notice">Notice</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>

              <li>
                <Link to="/registration">Registration</Link>
              </li>
              <li className="round-menu-button">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}

          {isAdmin && (
            <>
              <li>
                <Link to="/pendingRegistrations">Approve Users</Link>
              </li>
              <li>
                <Link to="/election">Election</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default HomeMenu;

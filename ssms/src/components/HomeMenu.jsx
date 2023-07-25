import React from 'react';
import { Link } from 'react-router-dom';

const HomeMenu= () => {
  return (
    <nav>
       <ul>
        <li><a href="#">Notice</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">Events</a></li>
        <li><Link to="/registration">Registration</Link></li>
        <li className="round-menu-button"><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default HomeMenu;

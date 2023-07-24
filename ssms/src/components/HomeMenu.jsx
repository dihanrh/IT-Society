import React from 'react';

const HomeMenu= () => {
  return (
    <nav>
       <ul>
        <li><a href="#">Notice</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">Events</a></li>
        <li><a href="#">Registration</a></li>
        <li className="round-menu-button"><a href="#">Login</a></li>
      </ul>
    </nav>
  );
};

export default HomeMenu;

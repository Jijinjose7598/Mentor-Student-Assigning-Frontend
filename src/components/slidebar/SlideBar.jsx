import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <span className="sidebar-text">Students</span>
      <Link to="/students" className="sidebar-link">
        All Students
      </Link>
      <span className="sidebar-text">Mentors</span>
      <Link to="/mentors" className="sidebar-link">
        All Mentors
      </Link>
    </div>
  );
};

export default Sidebar;

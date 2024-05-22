import React, { useState } from 'react';
import './aside.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [showAdminsDropdown, setShowAdminsDropdown] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [showEnrollementsDropdown, setShowEnrollementsDropdown] = useState(false);
  const [showFeedbacksDropdown, setShowFeedbacksDropdown] = useState(false);
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [showTestsDropdown, setShowTestsDropdown] = useState(false);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          LMS Dashboard
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
     
        <li className='sidebar-list-item'>
          <div className="dropdown">
            <p onClick={() => setShowAdminsDropdown(!showAdminsDropdown)}>
              Admins
            </p>
            {showAdminsDropdown && (
              <ul className="dropdown-content">
                <li className='linkContainer'>
                <Link className='link' to="/addAdmin"> Add Admin </Link>
                </li>
                <li className='linkContainer'>
                <Link className='link' to="/adminsList">Admins List</Link>
                </li>
                
                
              </ul>
            )}
          </div>
        </li>
        <li className='sidebar-list-item'>
          <div className="dropdown">
            <p onClick={() => setShowCoursesDropdown(!showCoursesDropdown)}>
              Courses
            </p>
            {showCoursesDropdown && (
              <ul className="dropdown-content">
                <li className='linkContainer'> 
                <Link className='link' to="/addCourse"> Add Course </Link>
                </li>
                <li className='linkContainer'>
                <Link className='link' to="/coursesList">Courses List</Link>
                </li>
                
              </ul>
            )}
          </div>
        </li>
        <li className='sidebar-list-item'>
          <div className="dropdown">
            <p onClick={() => setShowEnrollementsDropdown(!showEnrollementsDropdown)}>
              Enrollements
            </p>
            {showEnrollementsDropdown && (
              <ul className="dropdown-content">
                <li className='linkContainer'>
                <Link className='link' to="/addEnrollement"> Add Enrollement </Link>
                </li>
                <li className='linkContainer'>
                <Link className='link' to="/enrollementsList">Enrollements List</Link>
                </li>
                
              </ul>
            )}
          </div>
        </li>
        <li className='sidebar-list-item'>
          <div className="dropdown">
            <p onClick={() => setShowFeedbacksDropdown(!showFeedbacksDropdown)}>
              Feedbacks
            </p>
            {showFeedbacksDropdown && (
              <ul className="dropdown-content">
                <li className='linkContainer'>
                <Link className='link' to="/addFeedback"> Add Feedback </Link>
                </li>
                <li className='linkContainer'>
                <Link className='link' to="/feedbacksList">Feedbacks List</Link>
                </li>
                
              </ul>
            )}
          </div>
        </li>
        <li className='sidebar-list-item'>
          <div className="dropdown">
            <p onClick={() => setShowUsersDropdown(!showUsersDropdown)}>
              Users
            </p>
            {showUsersDropdown && (
              <ul className="dropdown-content">
                <li className='linkContainer'>
                <Link className='link' to="/addUser"> Add User </Link>
                </li>
                <li className='linkContainer'>
                <Link className='link' to="/usersList">Users List</Link>
                </li>
         
              </ul>
            )}
          </div>
        </li>
        <li className='sidebar-list-item'>
          <div className="dropdown">
            <p onClick={() => setShowTestsDropdown(!showTestsDropdown)}>
              Tests
            </p>
            {showTestsDropdown && (
              <ul className="dropdown-content">
                <li className='linkContainer'> 
                <Link className='link' to="/addTest"> Add test </Link>
                </li>
                <li className='linkContainer'>
                <Link className='link' to="/testsList">Tests List</Link>
                </li>
                
              </ul>
            )}
          </div>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar;

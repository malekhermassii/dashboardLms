import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import './List.css'; 
import { useNavigate } from 'react-router-dom';

function CoursesList() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3002/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleView = (courseId) => {
    navigate(`/ViewCourse/${courseId}`);
  };
  
  const handleUpdate = (courseId) => {
    navigate(`/UpdateCourse/${courseId}`);
  }

  const handleDelete = (courseId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (!isConfirmed) return;

    fetch(`http://localhost:3002/courses/${courseId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.message);
      setCourses(courses.filter(course => course._id !== courseId));
    })
    .catch(error => console.error('Error deleting course:', error));
  };

  return (
    <div className='grid-container'>
      <Sidebar />
      <main className='main-container'>
        <h1 className='text-dark text-center'>Courses List</h1>
        <table className='user-table'>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Description</th>
              <th>Topic</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.topic}</td>
                <td className='actions'>
                  <button onClick={() => handleView(course._id)} className='action-btn'>
                    <i className='ri-eye-line'></i>
                  </button>
                  <button onClick={() => handleUpdate(course._id)} className='action-btn'>
                    <i className='ri-edit-line'></i>
                  </button>
                  <button onClick={() => handleDelete(course._id)} className='action-btn'>
                    <i className='ri-delete-bin-line'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default CoursesList;

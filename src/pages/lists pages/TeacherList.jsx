import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import './List.css'; 
import { useNavigate } from 'react-router-dom';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3002/teachers')
      .then(response => response.json())
      .then(data => setTeachers(data))
      .catch(error => console.error('Error fetching teachers:', error));
  }, []);
  console.log(teachers)
  const handleView = (teacherId) => {
    navigate(`/ViewTeacher/${teacherId}`);
  };
  const handleUpdate = (teacherId)=>{
    navigate(`/UpdateTeacher/${teacherId}`);
  }
  const handleDelete = (teacherId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this teacher?");
    if (!isConfirmed) return;

    fetch(`http://localhost:3002/teachers/${teacherId}`, {
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
      setTeachers(teachers.filter(teacher => teacher._id !== teacherId));
    })
    .catch(error => console.error('Error deleting teacher:', error));
  };

  return (
    <div className='grid-container'>
      <Sidebar />
      <main className='main-container'>
        <h1 className='text-dark text-center'>Teacher List</h1>
        <table className='user-table'>
          <thead>
            <tr>
              <th>teacherName</th>
              <th>Email</th>
              <th>role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map(teacher => (
              <tr key={teacher._id}>
                <td>{teacher.teacherName}</td>
                <td>{teacher.email}</td>
                <td>{teacher.role}</td>
                <td className='actions'>
                  <button onClick={() => handleView(teacher._id)}  className='action-btn'>
                    <i className='ri-eye-line'></i>
                  </button>
                  <button onClick={() => handleUpdate(teacher._id)}  className='action-btn'>
                    <i className='ri-edit-line'></i>
                  </button>
                  <button onClick={() => handleDelete(teacher._id)} className='action-btn'>
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

export default TeacherList;

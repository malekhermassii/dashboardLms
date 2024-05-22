import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/aside/asideHeader';
import './List.css'; 
import { useNavigate } from 'react-router-dom';

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3002/admins')
      .then(response => response.json())
      .then(data => setAdmins(data))
      .catch(error => console.error('Error fetching admins:', error));
  }, []);
  console.log(admins)
  const handleView = (adminId) => {
    navigate(`/ViewAdmin/${adminId}`);
  };
  const handleUpdate = (adminId)=>{
    navigate(`/UpdateAdmin/${adminId}`);
  }
  const handleDelete = (adminId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this admin?");
    if (!isConfirmed) return;

    fetch(`http://localhost:3002/admins/${adminId}`, {
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
      setAdmins(admins.filter(admin => admin._id !== adminId));
    })
    .catch(error => console.error('Error deleting admin:', error));
  };

  return (
    <div className='grid-container'>
      <Sidebar />
      <main className='main-container'>
        <h1 className='text-dark text-center'>Admin List</h1>
        <table className='user-table'>
          <thead>
            <tr>
              <th>adminName</th>
              <th>Email</th>
              <th>role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin._id}>
                <td>{admin.adminName}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td className='actions'>
                  <button onClick={() => handleView(admin._id)}  className='action-btn'>
                    <i className='ri-eye-line'></i>
                  </button>
                  <button onClick={() => handleUpdate(admin._id)}  className='action-btn'>
                    <i className='ri-edit-line'></i>
                  </button>
                  <button onClick={() => handleDelete(admin._id)} className='action-btn'>
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

export default AdminList;

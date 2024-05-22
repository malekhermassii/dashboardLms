import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import { useParams , useNavigate} from 'react-router-dom';

function UpdateAdmin() { 
  const { adminId } = useParams();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({}); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => { 
    const fetchAdminData = async () => { // Function to fetch admin data
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3002/admins/${adminId}`); // Update URL with admin ID
        if (!response.ok) {
          throw new Error('Failed to fetch admin data');
        }
        const data = await response.json();
        setAdminData(data); // Set admin data in state
      } catch (error) {
        setError('Failed to fetch admin data. Please try again.');
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, [adminId]);

 

  const initialValues = { // Initial values populated with admin data
    adminName: adminData.adminName || '',
    email: adminData.email || '',
    password: '', // Password field should be blank for security reasons
  };

  const validationSchema = Yup.object().shape({
    adminName: Yup.string().required('Admin name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string(), // No need to enforce password validation for update
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3002/admins/${adminId}`, { // Update URL with admin ID
        method: 'PUT', // Use PUT method for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update admin');
      }

      console.log('Admin updated successfully');
      
      navigate(`/adminsList`);
    } catch (error) {
      setError('Failed to update admin. Please try again.'); // Handle error
      console.error('Error updating admin:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
        <Typography variant="h4" color="#000">Update Admin</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Field name="adminName" as={TextField} label="Admin Name" fullWidth margin="normal" />
              <ErrorMessage name="adminName" component="div" />

              <Field name="email" as={TextField} type="email" label="Email" fullWidth margin="normal" />
              <ErrorMessage name="email" component="div" />

              <Field name="password" as={TextField} type="password" label="Password" fullWidth margin="normal" />
              <ErrorMessage name="password" component="div" />

              {error && <div>{error}</div>}
              
              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading}>
                {loading ? 'Updating...' : 'Update Admin'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default UpdateAdmin;

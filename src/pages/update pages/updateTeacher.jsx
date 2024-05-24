import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import { useParams , useNavigate} from 'react-router-dom';

function UpdateTeacher() { 
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState({}); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => { 
    const fetchTeacherData = async () => { // Function to fetch teacher data
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3002/teachers/${teacherId}`); // Update URL with teacher ID
        if (!response.ok) {
          throw new Error('Failed to fetch teacher data');
        }
        const data = await response.json();
        setTeacherData(data); // Set teacher data in state
      } catch (error) {
        setError('Failed to fetch teacher data. Please try again.');
        console.error('Error fetching teacher data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacherData();
  }, [teacherId]);

 

  const initialValues = { // Initial values populated with teacher data
    teacherName: teacherData.teacherName || '',
    email: teacherData.email || '',
    password: '', // Password field should be blank for security reasons
  };

  const validationSchema = Yup.object().shape({
    teacherName: Yup.string().required('Teacher name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string(), // No need to enforce password validation for update
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3002/teachers/${teacherId}`, { // Update URL with teacher ID
        method: 'PUT', // Use PUT method for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update teacher');
      }

      console.log('Teacher updated successfully');
      
      navigate(`/teachersList`);
    } catch (error) {
      setError('Failed to update teacher. Please try again.'); // Handle error
      console.error('Error updating teacher:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
        <Typography variant="h4" color="#000">Update Teacher</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Field name="teacherName" as={TextField} label="Teacher Name" fullWidth margin="normal" />
              <ErrorMessage name="teacherName" component="div" />

              <Field name="email" as={TextField} type="email" label="Email" fullWidth margin="normal" />
              <ErrorMessage name="email" component="div" />

              <Field name="password" as={TextField} type="password" label="Password" fullWidth margin="normal" />
              <ErrorMessage name="password" component="div" />

              {error && <div>{error}</div>}
              
              <Button type="submit" variant="contained" className='btn mt-5' disabled={loading}>
                {loading ? 'Updating...' : 'Update Teacher'}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
}

export default UpdateTeacher;

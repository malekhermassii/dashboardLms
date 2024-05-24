import Sidebar from '../../components/aside/asideHeader'
import Header from '../../components/head/head';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
function AddTeacher() {
  const navigate = useNavigate();
  const initialValues = {
    teacherName: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    teacherName: Yup.string().required('teacher Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3002/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to create teacher');
      }

      const data = await response.json();
      console.log('Teacher created successfully:', data);
      navigate(`/teachersList`);

    } catch (error) {
      setError('Failed to create teacher. Please try again.'); // Handle error
      console.error('Error creating teacher:', error);
    } finally {
      setLoading(false);
    }
  };
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
   
   <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <main className='main-container'>
      <Typography variant="h4" color="#000">Add Teacher</Typography>
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
              {loading ? 'Adding...' : 'Add Teacher'}
            </Button>
          </Form>
        )}
      </Formik>
      </main>
   </div>
   
  )
}

export default AddTeacher

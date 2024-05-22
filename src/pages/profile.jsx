import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box, Button, TextField, Avatar, Typography, Container
} from '@mui/material';
import { updateUser } from '../state/index'; // Import the action to update user
const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: '',
    email: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');
  useEffect(() => {
    fetch(`http://localhost:3002/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        const imagePath = data.image ?`http://localhost:3002/images/${data.image}` : 'defaultImagePath';
        setImagePreview(imagePath);
   
      })
      .catch(error => console.error('Error:', error));
  }, [userId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3002/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      dispatch(updateUser(data)); // Update the user in the global state
      alert("update successfully")
      navigate('/home');
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={imagePreview}
          sx={{ width: 120, height: 120, mb: 2 }}
          alt="User Image"
        />
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={user.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            value={user.email}
            onChange={handleChange}
          />
          <Button
            className='btn ' 
            id='uploadBtn'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;

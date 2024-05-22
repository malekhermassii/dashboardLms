import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/aside/asideHeader';
import Header from '../../components/head/head';

function CourseForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [videos, setVideos] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideos(e.target.files);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('topic', topic);
    formData.append('price', price);
    formData.append('image', image);
  
    for (let i = 0; i < videos.length; i++) {
      formData.append('videos', videos[i]);
    }
  
    try {
      const response = await fetch('http://localhost:3002/courses', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Course created:', data);
  
        // // Verify if the video URLs are being returned correctly
        // if (data.videos && data.videos.length > 0) {
        //   data.videos.forEach(video => console.log('Video URL:', video.videoUrl));
        // }
  
        navigate('/coursesList');
      } else {
        const error = await response.text();
        console.error('Error:', error);
        // Show error message
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Show error message
    }
  };
  

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className='main-container'>
        <Typography variant="h4" color="#000">Create Course</Typography>
        <form onSubmit={handleSubmit} className="form-container mt-5">
          <div>
            <TextField className='mb-4' label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
          </div>
          <div>
            <TextField className='mb-4' label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline rows={4} fullWidth />
          </div>
          <div>
            <TextField className='mb-4' label="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} required fullWidth />
          </div>
          <div>
            <TextField className='mb-4' label="Price" value={price} onChange={(e) => setPrice(e.target.value)} required type="number" fullWidth />
          </div>
          <div>
            <input className='mb-4' type="file" accept="image/*" onChange={handleImageChange} required />
          </div>
          <div>
            <input className='mb-4' type="file" accept="video/*" multiple onChange={handleVideoChange} required />
          </div>
          <Button type="submit" variant="contained" className='btn mt-5'>Create Course</Button>
        </form>
      </main>
    </div>
  );
}

export default CourseForm;

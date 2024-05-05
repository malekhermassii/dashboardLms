import React, { useState, useEffect } from 'react';

const SingleCourse = ({ courseId }) => {
    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(`http://localhost:3002/courses/${courseId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCourse(data);
            } catch (err) {
                setError('Failed to fetch course');
                console.error(err);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
             <img src={`http://localhost:3002/public/images/${course.thumbnail}`} alt="Thumbnail" />
            <h1>{course.name}</h1>
            <p>Description: {course.description}</p>
            <p>Topic: {course.topic}</p>
            <p>Price: ${course.price.toFixed(2)}</p>
            <div>
                <h2>Videos</h2>
                {course.videos && course.videos.map(video => (
                    <div key={video._id}>
                        <video width="320" height="240" controls>
                            <source src={`http://localhost:3002/public/videos/${video.videoUrl}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <p>{video.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default  SingleCourse ;

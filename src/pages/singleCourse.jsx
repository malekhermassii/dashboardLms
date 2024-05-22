import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "./singleCourse.css";
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { addCourse } from '../state/index'; 
import Feedback from './feedbacks';

const SingleCourse = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const courses = useSelector(state => state.courses);
    const userId = user ? user._id : null;

    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [error, setError] = useState('');
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourseAndCheckEnrollment = async () => {
            try {
                const courseResponse = await fetch(`http://localhost:3002/courses/${courseId}`);
                if (!courseResponse.ok) throw new Error('Failed to fetch course');
                const courseData = await courseResponse.json(); //
                setCourse(courseData);
                
                const enrollmentResponse = await fetch(`http://localhost:3002/enroll/check?userId=${userId}&courseId=${courseId}`);
                if (!enrollmentResponse.ok) throw new Error('Failed to check enrollment');
                const enrollmentData = await enrollmentResponse.json();
                setEnrolled(enrollmentData.isEnrolled);

            } catch (error) {
                setError(error.message);
                console.error(error);
            }
   
        };
        console.log(course)
        fetchCourseAndCheckEnrollment();
    }, [userId, courseId]);

    const handleEnroll = async () => {
        if (enrolled) {
            alert('You are already enrolled in this course.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3002/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, courseId })
            });
            if (!response.ok) {
                throw new Error('Failed to enroll');
            }
            const enrolledCourse = await response.json();
            dispatch(addCourse(enrolledCourse));
            setEnrolled(true); // Update enrollment status immediately
            alert('Enrollment successful!');
        } catch (error) {
            console.error('Enrollment failed:', error);
            alert(error.message);
        }
    };

    const handleNextVideo = () => {
        if (currentVideoIndex < course.videos.length - 1) {
            setCurrentVideoIndex(prev => prev + 1);
        } else {
            // No more videos, navigate to the test page
            navigate(`/tests/${courseId}`);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!course) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <div className="course-detail">
                <img className='singleImg' src={`http://localhost:3002/images/${course.image}`} alt="Course Thumbnail" />
                <h1>{course.name}</h1>
                <p>Description: {course.description}</p>
                <p>Topic: {course.topic}</p>
                <p>Price: ${course.price.toFixed(2)}</p>
                {enrolled ? (
                    <div className="video-container">
                        <h2>Video: {course.videos[currentVideoIndex].title}</h2>
                        <video className='videoSingle' controls>
                            <source src={`http://localhost:3002/videos/${course.videos[currentVideoIndex].videoURL}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="video-navigation">
                            <button className='btn'  onClick={() => setCurrentVideoIndex(prev => (prev > 0 ? prev - 1 : 0))}>Previous Video</button>
                            <button className='btn' onClick={handleNextVideo}>Next Video</button>
                        </div>
                    </div>
                ) : (
                    <button onClick={handleEnroll} className="btn enroll-button">Enroll Now</button>
                )}
                <Feedback courseId={courseId} courseName={course.name}/>
            </div>
            <Footer />
        </>
    );
};

export default SingleCourse;

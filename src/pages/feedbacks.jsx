import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFeedback, setFeedbacks } from '../state/index'
import "./feedbacks.css"
const FeedbackComponent = ({ courseId , courseName }) => {
    const [feedbackContent, setFeedbackContent] = useState('');
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const feedbacks = useSelector((state) => state.feedbacks);
    const user = useSelector(state => state.user);
    // const course = useSelector(state => state.course);
    // const userId = user ? user._id : null;

    useEffect(() => {
        // Fetch feedbacks for the selected course
        fetchFeedbacks();
    }, [courseId]);
// affichage
    const fetchFeedbacks = async () => {
        try {
            const response = await fetch(`http://localhost:3002/feedbacks/course/${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch feedbacks');
            }
            const data = await response.json();
            dispatch(setFeedbacks({ feedbacks: data }));
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3002/feedbacks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user.name, 
                    course: courseName,
                    content: feedbackContent,
                    rating: rating,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }
            console.log('Feedback submitted');
            const newFeedback = {
                user: user.name, 
                course: courseName,
                content: feedbackContent,
                rating: rating,
            };
            dispatch(addFeedback(newFeedback));
            setFeedbackContent('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    return (
   <section className='feedbacks'>
     <div className="feedback-container">
        <h2>Leave Feedback</h2>
        <form className="feedback-form" onSubmit={handleSubmit}>
            <div>
                <label>Feedback:</label>
                <textarea value={feedbackContent} onChange={(e) => setFeedbackContent(e.target.value)} />
            </div>
            <div>
                <label>Rating:</label>
                <input type="number" value={rating} min="0" max="5" onChange={(e) => setRating(parseInt(e.target.value))} />
            </div>
            <button className='btn' type="submit">Submit Feedback</button>
        </form>

        <h2 className='heading'>Feedbacks for this Course</h2>
        <ul className="feedback-list">
            {feedbacks.map((feedback) => (
                <li key={feedback._id}>
                    <p>{feedback.user && feedback.user.name ? feedback.user.name : "No user name"}</p>
                    <p>{feedback.content}</p>
                    <p className="rating">Rating: {feedback.rating}</p>
                </li>
            ))}
        </ul>
    </div>
   </section>

    );
};

export default FeedbackComponent;

import './test.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, RadioGroup, Radio, FormControlLabel, Button, CircularProgress } from '@mui/material';

const Test = () => {
  const { courseId } = useParams();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState({});
  const [evaluation, setEvaluation] = useState({});

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await fetch(`http://localhost:3002/tests/course/${courseId}`);
        if (!response.ok) throw new Error('Failed to fetch test data');
        const testData = await response.json();
        setTest(testData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch test data. Please try again.');
        console.error('Error fetching test data:', error);
        setLoading(false);
      }
    };

    fetchTest();
  }, [courseId]);

  const handleOptionChange = (event, questionIndex) => {
    const { name, value } = event.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleSubmit = (form) => {
    form.preventDefault();
    const evaluationResult = {};
    test.questions.forEach((question, index) => {
      evaluationResult[index] = {
        isCorrect: answers[`question-${index}`] === question.correctAnswer,
        selectedOption: answers[`question-${index}`]
      };
    });
    setEvaluation(evaluationResult);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h5" color="error">{error}</Typography>;
  if (!test) return <Typography variant="h5" color="error">No test found for this course.</Typography>;

  return (
    <div className="test-container">
      <Typography variant="h4" className="test-title">Test Your Knowledge </Typography>
      <form onSubmit={handleSubmit}>
        <List>
          {test.questions.map((question, index) => (
            <ListItem key={index} className="question-item">
              <ListItemText primary={<span className="question-text">Question {index + 1}: {question.questionText}</span>} />
              <RadioGroup
                name={`question-${index}`}
                value={answers[`question-${index}`] || ''}
                onChange={(e) => handleOptionChange(e, index)}
                className="options-container"
              >
                {question.options.map((option, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={option}
                    control={<Radio />}
                    label={
                      <span
                        className={
                          evaluation[index] && evaluation[index].selectedOption === option
                            ? evaluation[index].isCorrect ? 'correct-answer' : 'wrong-answer'
                            : ''
                        }
                      >
                        {option}
                      </span>
                    }
                  />
                ))}
              </RadioGroup>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" type="submit" className="submit-button">Submit Test</Button>
      </form>
    </div>
  );
};

export default Test;

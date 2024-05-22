import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CourseCard from "../components/Courses-section/CourseCard";
import "../components/Courses-section/courses.css";
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"

const Courses = () => {
  const [courses, setCourses] = useState([]); // Stores the courses data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Stores any error

  useEffect(() => {
    fetch('http://localhost:3002/courses') // Replace with your backend URL
      .then(response => {
        if (!response.ok) { // Check if response came back fine
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data); // Set courses data
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error.message); // Set error message
        setLoading(false); // Ensure loading is false on error
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section style={{paddingTop:"20px" , paddingBottom:0}}>
      <Container style={{marginBottom: "100px"}}>
      <Header/>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-100">
                <h2 className="text-center">Our Courses List</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>
            </div>
          </Col>
          {courses.map((item) => (
            <Col lg="4" md="6" sm="6" key={item.id}>
              <CourseCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer/>
   
      </section>
   );};
export default Courses;

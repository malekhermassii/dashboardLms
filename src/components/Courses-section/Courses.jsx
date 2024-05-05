import React from "react";
import { Container, Row, Col } from "reactstrap";
// container  ,row(grid system 12)
import courseImg1 from "../../assests/images/web-design.png";
import courseImg2 from "../../assests/images/graphics-design.png";
// bootstrap : framework css (btn)
import courseImg3 from "../../assests/images/ui-ux.png";
import "./courses.css";
import CourseCard from "./CourseCard";
// import AllCourses from "../../pages/allCourses"
import { useNavigate } from 'react-router-dom';
const coursesData = [{
    id: "01",
    name: "Web Design BootCamp-2022 for Beginners",
    topic: "Information technology",
    students: 12.5,
    feedback: 5.9,
    thumbnail: courseImg1,
  }, 
  {
    id: "02",
    name: "Professional Graphics Design, PhotoShop, Adobe XD, Figma",
    topic: "design",
    students: 12.5,
    feedback: 5.9,
    thumbnail: courseImg2, },
  {
    id: "03",
    name: "UI/UX BootCamp for Beginners in 2022",
    topic: "UI/UX",
    students: 12.5,
    feedback: 5.9,
    thumbnail: courseImg3,
   },
  ];
const Courses = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/courses');
  };
  return (
    <>  
     <section id="courses">
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h2>Our Popular Courses</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              <div className="w-50 text-end">
                <button onClick={handleNavigation} className="btn" >See All</button>
              </div>
            </div>
          </Col>
          {coursesData.map((item) => (
            <Col lg="4" md="6" sm="6">
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
    </>
   );};
export default Courses;
// user : login () : registration(login)
// props : (from parent(courses) to child(courseCard))

import React from "react";
import "./about.css";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assests/images/about-us.png";
// import CountUp from "react-countup";
import "./about.css";
const AboutUs = () => {
  return (
    <section id="about">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
          <Col lg="6" md="6">
            <div className="about__content">
              <h2>About Us</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Excepturi cupiditate animi deserunt libero nesciunt corporis
                explicabo nobis ex quo molestiae!
              </p>
              <div className="about__counter">
                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                    <h2>25K</h2>
                    </span>
                    <p className="counter__title">Completed Projects</p>
                  </div>
                  <div className="single__counter">
                    <span className="counter">
                        <h2>12K</h2>
                    </span>
                    <p className="counter__title">Patient Around World</p>
                  </div>
                </div>
                <div className=" d-flex gap-5 align-items-center">
                  <div className="single__counter">
                    <span className="counter">
                      <h2>95M</h2>
                    </span>
                    <p className="counter__title">Ideas Raised Funds</p>
                  </div>
                  <div className="single__counter">
                    <span className="counter">
                      <h2>5K</h2>
                    </span>
                    <p className="counter__title">Categories Served</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default AboutUs;
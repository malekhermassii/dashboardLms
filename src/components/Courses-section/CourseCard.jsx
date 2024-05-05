import React from "react";
const CourseCard = (props) => {
  const { thumbnail, name, topic, description, feedback } = props.item;
  return (
    <div className="single__course__item">
      <div className="course__img">
        <img src={thumbnail} alt="cover image" className="w-100" />
      </div>
      <div className="course__details">
        {/* mb-4 : margin bottom  */}
        <h6 className="course__title mb-4">{name}</h6>
        <div className=" d-flex justify-content-between align-items-center">
          <p className="lesson d-flex align-items-center gap-1">
            <i class="ri-book-open-line"></i> {topic} 
          </p>
          {/* <p className="students d-flex align-items-center gap-1">
            <i class="ri-user-line"></i> {description}
          </p> */}
        </div>
        <div className=" d-flex justify-content-between align-items-center">
          <p className="rating d-flex align-items-center gap-1">
            <i class="ri-star-fill"></i> {feedback}
          </p>
          <p className="enroll d-flex align-items-center gap-1">
            <a href="#"> Enroll Now</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
// courses container : content 
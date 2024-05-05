// Import React and the useRef hook from the React library.
import React, { useRef } from "react";
// Import Container component from reactstrap to use for layout.
import { Container } from "reactstrap";
// Import specific CSS styles for this header component.
import "./header.css";

// Array of objects, each representing a navigation link with text and a link URL.
const navLinks = [
  {
    display: "Home",
    url: "#home",
  },
  {
    display: "About",
    url: "#about",
  },
  {
    display: "Courses",
    url: "#courses",
  },
  {
    display: "profile",
    url: "#profile",
  },
  {
    display: "contact",
    url: "#contact",
  }
];
// DOM : 
// Defines the Header component.
const Header = () => {
  // useRef hook is used to create a reference to the navigation menu HTML element.
  const menuRef = useRef();
  // Function to toggle the 'active__menu' className on and off for the nav menu element.
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  // The return statement includes JSX that describes the component's UI.
  return (
    // The header tag is used as the root element of the header component.
    <header className="header">
      {/* // Container from reactstrap provides a responsive fixed width container. */}
      <Container>
        {/* // Flexbox container to align logo and navigation items properly. */}
        <div className="d-flex align-items-center justify-content-between">
          {/* // Logo section. */}
          <div className="logo">
            <h2 className="align-items-center gap-1">
              {/* // Icon from RemixIcon library followed by the brand name. */}
              <i className="ri-pantone-line"></i> Rouem.
            </h2>
          </div>
          {/* // Navigation section contains navigation links and login button. */}
          <div className="nav d-flex align-items-center gap-5">
            {/* gap : margin */}
            {/* // Navigation menu which can  toggled by clicking, reference attached here. */}
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              {/* // Unordered list for navigation links. */}
              <ul className="nav__list">
                {/* // Mapping navLinks array to list items. */}
                {navLinks.map((item, index) => (
                  // List item for each link. The 'key' prop is essential for React list rendering.
                  <li key={index} className="nav__item">
                    {/* // Anchor tag for navigation; 'href' points to an internal link. */}
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* // Contains additional navigation or action items like the login button. */}
            <div className="nav__right">
              <p className="mb-0 d-flex align-items-center gap-2">
                {/* // Button styled with Bootstrap classes for login action. */}
                <button className="btn">Log In</button>
              </p>
            </div>
          </div>
          {/* // Mobile menu icon that shows only in mobile view to toggle the menu. */}
          <div className="mobile__menu">
            <span>
              {/* // Clickable icon for expanding the mobile navigation menu. */}
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};
// Exports the Header component so it can be used in other parts of the application.
export default Header;

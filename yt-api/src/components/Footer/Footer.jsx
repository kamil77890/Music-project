import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaSnapchatGhost,
  FaFacebookF,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`styles ${isHovered ? "active" : "disable"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <footer>
        <div className="social">
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaSnapchatGhost />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaFacebookF />
          </a>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Home</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Services</a>
          </li>
          <li className="list-inline-item">
            <a href="#">About</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
        <p className="copyright">Company Name © 2024</p>
      </footer>
    </div>
  );
}

export default Footer;

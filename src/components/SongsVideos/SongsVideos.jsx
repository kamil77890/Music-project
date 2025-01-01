import React, { useState, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.scss";

const SongsVideos = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <aside>
      <div className={`visibleImage ${isVisible ? "expanded" : ""}`}>
        {isVisible ? (
          <div className="section0">
            <h1>Yt songs</h1>
            <div className="selection">
              <Link to="/downloaded-songs">
                <div>Downloaded songs</div>
              </Link>
              <Link to="/favorite-songs">
                <div>Favorite songs</div>
              </Link>
              <Link to="/query-history">
                <div>Query history</div>
              </Link>
              <Link to="/info">
                <div>Info</div>
              </Link>
              <Link to="/about-us">
                <div>About Us!</div>
              </Link>
            </div>
            <div className="turnOff">
              <button className="Off" onClick={handleToggle}>
                <FaAngleLeft size={38} />
              </button>
            </div>
            <footer>
              <p>
                © Kamil & Bambus
                <br /> Sp.z o.o. 2024
              </p>
            </footer>
          </div>
        ) : (
          <div className="turnOn">
            <button className="On" onClick={handleToggle}>
              <FaAngleRight size={38} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SongsVideos;

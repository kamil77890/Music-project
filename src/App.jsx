import { useState, useContext } from "react";
import YouTubeVideos from "./components/YT-api";
import LanguageDropdown from "./components/LanguageDropdown/LanguageDropdown";
import { Routes, Route } from "react-router-dom";
import ThemeContext from "./contexts/ThemeContext";

import "./App.scss";
import Footer from "./components/Footer/Footer";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`app ${theme}`}>
      <LanguageDropdown />
      <Routes>
        <Route path="/" element={<YouTubeVideos />} />
        <Route path="/search/:query" element={<YouTubeVideos />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

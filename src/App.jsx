import { useState, useContext, useRef } from "react";
import YouTubeVideos from "./components/YT-api";
import LanguageDropdown from "./components/LanguageDropdown/LanguageDropdown";
import { Routes, Route } from "react-router-dom";
import { ThemeContext } from "./contexts/ThemeContext";
import SongsVideos from "./components/SongsVideos/SongsVideos";
import DownloadedSongs from "./components/DownloadedSongs";
import FavoriteSongs from "./components/FavoriteSongs";

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
        <Route path="/songs" element={<SongsVideos />} />
        <Route path="/downloaded-songs" element={<DownloadedSongs />} />
        <Route path="/favorite-songs" element={<FavoriteSongs />} />
        {/* <Route path="/songs/info" element={<Info />} />
        <Route path="/songs/about" element={<AboutUs />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

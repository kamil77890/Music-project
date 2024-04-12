import React, { useState, useEffect, useRef } from "react";
import fetchSong from "../../utils.js";
import axios from "axios";
import "./Converter.scss";

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("music");
  const key = "AIzaSyAzy1Qf_lhA4snxKLL7FP6EmNGk7euZRIE";

  const fetchData = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&maxResults=10&q=${query}`
    );
    setSongs(response.data.items);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = (videoId) => {
    fetchSong();
  };

  return (
    <div>
      <h2>YouTube Songs</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} />
        <button>Search...</button>
      </form>

      <ul>
        {songs.map((song) => (
          <li key={song.id.videoId}>
            <span>{song.snippet.title}</span>
            <button onClick={() => handleClick(song.id.videoId)}>
              Download
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeSongs;

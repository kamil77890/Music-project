import React, { useState } from "react";
import axios from "axios";
import "./Converter.scss";

import DownloadButton from "../downloadButton";

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("something like this");
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

  return (
    <div>
      <h2>YouTube Songs</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value="something like this"
          onChange={handleInputChange}
        />
        <button>Search...</button>
      </form>

      <ul>
        {songs.map((song) => (
          <li key={song.id.videoId}>
            <span>{song.snippet.title}</span>
            <DownloadButton
              videoId={song.id.videoId}
              title={song.snippet.title}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeSongs;

// pobieranie danych z YT do innego komponentu
// design strony ( pinterest )

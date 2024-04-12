import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "converter.scss";

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("music");
  const key = "AIzaSyAOYIg-rcUamh9qIOKjwk1lEfdxkl0C1Aw";

  const fetchData = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&maxResults=10&q=${query}`
    );
    setSongs(response.data.items);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = (link) => {
    window.open(`https://www.youtube.com/watch?v=${link}`, "_blank").focus();
  };

  return (
    <div>
      <h2>YouTube Songs</h2>
      <input type="text" onChange={handleInputChange} />
      <button onSubmit={fetchData()}>Search...</button>

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

// api YT -> client -> którą pobrać ->
// my używamy fetch do zamiany plików mp4 na mp3 i ich pobieranie:
// https://ytmp3s.nu/link_do_filmu -> responce ->
// https://notube.net/pl/youtube-app-v159

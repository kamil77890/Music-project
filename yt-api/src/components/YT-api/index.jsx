import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Converter.scss";
import getVideo from "../../utils";

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

  const handleDownloadButtonClick = async (videoId) => {
    const response = await getVideo(videoId);
    console.log(response);
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
            <button onClick={() => handleDownloadButtonClick(song.id.videoId)}>
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

import React, { useState } from "react";
import axios from "axios";
import Songs from "../../Songs";
import DetailedData from "../detailedData";

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const key = "AIzaSyAzy1Qf_lhA4snxKLL7FP6EmNGk7euZRIE";

  const fetchData = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&key=${key}&q=ja`
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
    <form onSubmit={handleSubmit}>
      <div>
        <h2>YouTube Songs</h2>

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
        />
        <button>Search...</button>
        <DetailedData songs={songs} />
      </div>
    </form>
  );
};

export default YouTubeSongs;

// dane szczegółowe https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=${query}&maxResults=18&eventType=completed&key=${key}

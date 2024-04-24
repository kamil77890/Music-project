import React, { useState } from "react";
import axios from "axios";
import Songs from "../Songs";

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
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
    <form onSubmit={handleSubmit}>
      <div>
        <h2>YouTube Songs</h2>

        <input
          type="text"
          placeholder="Search..."
          onChange={handleInputChange}
        />
        <button>Search...</button>

        <Songs songs={songs} />
      </div>
    </form>
  );
};

export default YouTubeSongs;

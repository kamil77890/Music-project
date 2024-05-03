import React, { useState } from "react";
import axios from "axios";
import DetailedData from "../detailedData";
import "./search.scss";

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

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <div className="search-box">
            <h1>YouTube Songs</h1>
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button>Search</button>
          </div>
        </form>
      </header>
      <DetailedData songs={songs} />
    </>
  );
};

export default YouTubeSongs;

// dane szczegółowe https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=${query}&maxResults=18&eventType=completed&key=${key}

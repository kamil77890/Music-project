import React, { useState } from "react";
import axios from "axios";
<<<<<<< HEAD:yt-api/src/components/YT-api/index.jsx
import DetailedData from "./detailedData";
import SearchInput from "../SearchInput";
=======
import DetailedData from "../detailedData";
import "./search.scss";
>>>>>>> 43dbf38d933149f2c5e43a6a3edf92543af70633:yt-api/src/components/YT-api/search/index.jsx

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const key = "AIzaSyAzy1Qf_lhA4snxKLL7FP6EmNGk7euZRIE";

  const fetchData = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&key=${key}&q=${query}`
    );
    setSongs(response.data.items);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
<<<<<<< HEAD:yt-api/src/components/YT-api/index.jsx
    <div>
      <h2>YouTube Songs</h2>
      <SearchInput
        query={query}
        onInputChange={handleInputChange}
        onFormSubmit={handleSubmit}
      />
      <DetailedData songs={songs} />
    </div>
=======
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <div className="search-box">
            <h2>YouTube Songs</h2>
            <span>by kamil77980 & bambus80</span>
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
>>>>>>> 43dbf38d933149f2c5e43a6a3edf92543af70633:yt-api/src/components/YT-api/search/index.jsx
  );
};

export default YouTubeSongs;

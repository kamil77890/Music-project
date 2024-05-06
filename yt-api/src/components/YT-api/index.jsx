import React, { useState } from "react";
import axios from "axios";
import SearchInput from "../SearchInput";
import DetailedData from "./DetailedData";
import "./search.scss";

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
    <>
      <header className="nav">
        <h2 className="title">YouTube Songs</h2>
        <span>by kamil77980 & bambus80</span>
        <SearchInput
          query={query}
          onInputChange={(event) => setQuery(event.target.value)}
          onFormSubmit={handleSubmit}
        />
      </header>
      <main className="songs">
        <DetailedData songs={songs} />
      </main>
    </>
  );
};

export default YouTubeSongs;

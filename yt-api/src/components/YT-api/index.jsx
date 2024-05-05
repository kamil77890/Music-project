import React, { useState } from "react";
import axios from "axios";
import DetailedData from "./detailedData";
import SearchInput from "../SearchInput";

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

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h2>YouTube Songs</h2>
      <SearchInput
        query={query}
        onInputChange={handleInputChange}
        onFormSubmit={handleSubmit}
      />
      <DetailedData songs={songs} />
    </div>
  );
};

export default YouTubeSongs;

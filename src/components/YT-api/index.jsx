import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "../SearchInput";
import DetailedData from "./DetailedData";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { useParams } from "react-router-dom";
import "./search.scss";
import SongsVideos from "../SongsVideos/SongsVideos";

const YouTubeSongs = () => {
  const { getString } = useLanguageContext();
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");

  const key = "AIzaSyAzy1Qf_lhA4snxKLL7FP6EmNGk7euZRIE";
  const { query: searchQuery } = useParams();

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      fetchData();
    }
  }, [searchQuery]);

  const setQueryAndFetchData = (query) => {
    setQuery(query);
    fetchData();
  }

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
      <SongsVideos />
      <header className="nav">
        <div>
          <img className="favicon" src="favicon.svg" alt="Logo" />
          <h2 className="title">{getString("header")}</h2>
        </div>


        <SearchInput
          query={query}
          onInputChange={(event) => setQuery(event.target.value)}
          onFormSubmit={handleSubmit}
        />
      </header>
      <DetailedData songs={songs} />
    </>
  );
};

export default YouTubeSongs;

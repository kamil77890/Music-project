import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("music");
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef();
  const key = "AIzaSyAOYIg-rcUamh9qIOKjwk1lEfdxkl0C1Aw";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&maxResults=10&q=${query}`
      );
      const data = await response.json();
      setSongs(data.items);
    };

    fetchData();
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    acces;
  };

  return (
    <div>
      <h2>YouTube Songs</h2>
      <input type="text" value={query} onChange={handleInputChange} />

      <ul>
        {songs.map((song) => (
          <li key={song.id.videoId}>
            <span>{song.snippet.title}</span>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${song.id.videoId}`}
              allowFullScreen
            ></iframe>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeSongs;

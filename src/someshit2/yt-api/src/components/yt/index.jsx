import React, { useState, useEffect } from "react";

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("pop");

  useEffect(() => {
    const fetchData = async () => {
      const key = "AIzaSyAvE9VqeJWOJoTwGK9Wi3lM2x8Jg5AXA5s";
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&maxResults=10&q=${query}`
      );
      const data = await response.json();
      setSongs(data.items);
    };

    fetchData();

  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  

  return (
    <div>
      <h2>YouTube Songs</h2>
      <input type="text" value={query} onChange={handleInputChange} />
      <ul>
        {songs.map((song) => (
          <li key={song.id.videoId}>
            <a
              href={`https://www.youtube.com/watch?v=${song.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {song.snippet.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeSongs;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const YouTubeSongs = () => {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("music");
  const key = "AIzaSyAOYIg-rcUamh9qIOKjwk1lEfdxkl0C1Aw";

  const fetchData = async () => {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet&type=video&maxResults=10&q=${query}`
    );
    setSongs(response.data.items);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    console.log(query);
  };

  return (
    <div>
      <h2>YouTube Songs</h2>
      <input type="text" onChange={handleInputChange} />
      <button onSubmit={fetchData}>Search...</button>

      <ul>
        {songs.map((song) => (
          <li key={song.id.videoId}>
            <span>{song.snippet.title}</span>
            <button>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeSongs;

// .then((response) => response.blob())
//   .then((blob) => {
//     // Create blob link to download
//     const url = window.URL.createObjectURL(
//       new Blob([blob]),
//     );
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute(
//       'download',
//       `FileName.pdf`,
//     );

//     // Append to html link element page
//     document.body.appendChild(link);

//     // Start download
//     link.click();

//     // Clean up and remove the link
//     link.parentNode.removeChild(link);

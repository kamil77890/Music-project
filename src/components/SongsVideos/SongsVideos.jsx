import React, { useState, useEffect } from "react";
import axios from "axios";

const SongsVideos = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    fetchSongsList();
  }, []);

  const fetchSongsList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/songs_list");
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs list:", error);
    }
  };

  const playSong = (songName) => {
    setCurrentSong(songName);

    const songUrl = `http://localhost:5000/songs/${encodeURIComponent(
      songName
    )}`;
    const audioPlayer = document.getElementById("audio-player");

    audioPlayer.src = songUrl;
    audioPlayer.play();
  };

  return (
    <div>
      <h1>Music Player</h1>
      <ul>
        {songs.map((song, index) => (
          <div key={index}>
            <button onClick={() => playSong(song)}>{song}</button>
          </div>
        ))}
      </ul>
      <audio controls id="audio-player">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default SongsVideos;

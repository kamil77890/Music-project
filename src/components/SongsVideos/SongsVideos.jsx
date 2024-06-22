import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";

const SongsVideos = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    axios
      .get("/songs/songs.json")
      .then((response) => {
        setSongs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the songs:", error);
      });
  }, []);

  const playSong = (songTitle) => {
    const songUrl = `http://localhost:5000/songs/${encodeURIComponent(
      songTitle
    )}.mp3`;
    const audioPlayer = document.getElementById("audio-player");

    audioPlayer.src = songUrl;
    audioPlayer.play();
    setCurrentSong(songTitle);
  };

  return (
    <aside className="videos">
      <div>
        <h1>Music Player</h1>
      </div>

      <div>
        {songs.map(
          ([id, songArray]) =>
            Array.isArray(songArray) &&
            songArray.map((song, index) => (
              <div key={index}>
                <button onClick={() => playSong(song.title)}>
                  {song.title}
                </button>
              </div>
            ))
        )}
        <audio controls id="audio-player">
          Your browser does not support the audio element.
        </audio>
      </div>
      <div>footer</div>
    </aside>
  );
};

export default SongsVideos;

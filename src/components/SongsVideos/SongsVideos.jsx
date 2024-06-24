import React, { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import axios from "axios";
import "./style.scss";

const SongsVideos = () => {
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState("");

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
    if (audio) {
      audio.pause();
    }
    if (isPlaying && currentSongTitle === songTitle) {
      setIsPlaying(false);
      return;
    }

    const songUrl = `http://localhost:5000/songs/${encodeURIComponent(
      songTitle
    )}.mp3`;

    const newAudio = new Audio(songUrl);
    setAudio(newAudio);
    setCurrentSongTitle(songTitle);

    newAudio.play().then(() => {
      setIsPlaying(true);
    });

    newAudio.onended = () => {
      audio.play();
      setIsPlaying(true);
    };
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
              <div
                key={index}
                className="video"
                onClick={() => playSong(song.title)}
              >
                {isPlaying && currentSongTitle === song.title ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )}
                <img src={song.src} alt="img" className="songImg" />
                <h5>{song.title}</h5>
              </div>
            ))
        )}
      </div>
      <div>footer</div>
    </aside>
  );
};

export default SongsVideos;

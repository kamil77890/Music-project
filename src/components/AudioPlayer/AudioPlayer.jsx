import React, { useState } from "react";
import Playlist from "../context/Playlist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

const AudioPlayer = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const handleToggleButtonClick = () => {
    if (!selectedSong) {
      setError("No song selected");
      return;
    }

    if (error) {
      setError(null);
    }

    if (!isPlaying) {
      try {
        setIsPlaying(true);
        console.log(selectedSong);
        audio.src = selectedSong;
        audio.play();
      } catch (error) {
        console.log("Error toggling audio playback:", error);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  audio.onerror = (error) => {
    setError(error);
    setIsPlaying(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <ul>
        {Playlist.map((song) => (
          <li key={song.id}>
            <div className="songContainer">
              <div className="settup">
                {/* <img src={song.Url} alt="songImage" /> */}
                <h1>{song.title}</h1>
              </div>
              <div className="controls">
                <CiHeart />
                <BsThreeDotsVertical />
              </div>
              <button onClick={() => setSelectedSong(song.path)}>
                PLay some sht
              </button>
            </div>
            <div className="player">
              <button onClick={handleToggleButtonClick}>
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioPlayer;

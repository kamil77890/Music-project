import React, { useState } from "react";
import Playlist from "../context/Playlist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

const AudioPlayer = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastSong, setLastSong] = useState(null);
  const [date, setDate] = useState(new Date());

  const handleToggleButtonClick = () => {
    if (!isPlaying && selectedSong(false)) {
      setIsPlaying(true);
      audio.src = selectedSong;
      audio.play();
    } else {
      audio.pause();
      setIsPlaying(false);
    }
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
              <h1>{formatTime(date)}</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioPlayer;

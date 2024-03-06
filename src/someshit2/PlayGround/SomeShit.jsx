import React, { useState } from "react";
import Playlist from "../../components/context/Playlist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

const AudioPlayer = () => {
  const [audio, setAudio] = useState(new Audio());
  const [playingId, setPlayingId] = useState(null);
  const [isChosen, setIsChosen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handlePlay = (path, id) => {
    if (!isChosen) {
      setPlayingId(id);
      setIsChosen(true);
      audio.src = path;
      audio.play();
    } else {
      setPlayingId(null);
      setIsChosen(false);
      audio.pause();
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <h3>Music Shoot!</h3>
      <p>Current Date: {date.toLocaleDateString()}</p>
      <ul>
        {Object.keys(Playlist).map((id) => {
          const song = Playlist[id];
          return (
            <li key={id}>
              <div>
                <h3>{song.title}</h3>
                <h5>{id}</h5>
                <button onClick={() => handlePlay(song.path, id)}>
                  {playingId === id ? "pause" : "play"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AudioPlayer;

// AudioPlayer.jsx
import React, { useEffect, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "./AudioPlayer.scss";
import Playlist from "../../assets/songs.json";

const AudioPlayer = (props) => {
  const { src, id } = props;
  const [audio, setAudio] = useState(new Audio(src));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setAudio(new Audio(src));
    return () => audio.pause();
  }, [src]);

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio]);

  const currentSong = Playlist.find((song) => String(song.id) === String(id));
  const songName = currentSong ? currentSong.title : "";

  const handleToggleButtonClick = () => {
    isPlaying ? audio.pause() : audio.play();
  };

  return (
    <div className="audio-player">
      <button onClick={handleToggleButtonClick}>
        {isPlaying ? <FaPause /> : <FaPlay />}
        <span style={{ padding: "5px", textAlign: "center" }}>{songName}</span>
      </button>
    </div>
  );
};

export default AudioPlayer;

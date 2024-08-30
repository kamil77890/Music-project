import { useState, useEffect } from "react";
import axios from "axios";
import { playSong, toggleLike, formatSeconds } from "../../utils";
import { TiHeart, TiHeartOutline } from "react-icons/ti";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./DownloadedSongs.scss";

function DownloadedSongs() {
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState("");
  const [savedTime, setSavedTime] = useState(0);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await axios.get("/songs/songs.json");
      setSongs(response.data);
    };

    fetchSongs();

    const intervalId = setInterval(fetchSongs, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="downloaded-songs">
      <div className="back">
        <Link to="/">
          <FaAngleLeft size={48} />
        </Link>
      </div>
      <div className="header">
        <h1>Downloaded Songs</h1>
      </div>
      <div className="song-list">
        {songs.map((song, index) => {
          const key = Object.keys(song)[0];
          const songData = song[key];
          return (
            <div
              key={index}
              className="song-item"
              onClick={() =>
                playSong(
                  key,
                  audio,
                  setAudio,
                  isPlaying,
                  setIsPlaying,
                  currentSongId,
                  setCurrentSongId,
                  savedTime,
                  setSavedTime,
                  songs,
                  setSongs
                )
              }
            >
              <div
                className="like-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(songData.videoId, songs, setSongs);
                }}
              >
                {songData.liked ? (
                  <TiHeart size={24} />
                ) : (
                  <TiHeartOutline size={24} />
                )}
              </div>
              <img
                src={songData.src}
                alt={songData.title}
                className="song-image"
              />
              <h5 className="song-title">{songData.title}</h5>
              <div className="song-duration">
                {songData.duration.minutes}:
                {formatSeconds(songData.duration.seconds)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DownloadedSongs;

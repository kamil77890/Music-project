import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { favoriteSongsSelector, playSong, toggleLike } from "../../utils";
import { TiHeart, TiHeartOutline } from "react-icons/ti";
import { FaAngleLeft } from "react-icons/fa";
import "./FavoriteSongs.scss";

function FavoriteSongs() {
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [savedTime, setSavedTime] = useState(0);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const songs = await favoriteSongsSelector();
      setFavoriteSongs(songs);
    };

    fetchFavoriteSongs();
  }, []);

  return (
    <div>
      <Link to="/">
        <h1>Your Favorite Songs</h1>
      </Link>

      {favoriteSongs.length > 0 ? (
        favoriteSongs.map((song, index) => {
          const key = Object.keys(song)[0];
          const songData = song[key];
          return (
            <div
              key={index}
              className="song-item"
              onClick={() =>
                playSong(
                  songData.videoId,
                  audio,
                  setAudio,
                  isPlaying,
                  setIsPlaying,
                  currentVideoId,
                  setCurrentVideoId,
                  savedTime,
                  setSavedTime
                )
              }
            >
              <div
                className="like-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(songData.videoId, favoriteSongs, setFavoriteSongs);
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
              <div className="time">
                {Object.values(songData.duration)[0]}:
                {Object.values(songData.duration)[1] < 10
                  ? `0${Object.values(songData.duration)[1]}`
                  : `${Object.values(songData.duration)[1]}`}
              </div>
              <h5 className="song-title">{songData.title}</h5>
            </div>
          );
        })
      ) : (
        <p>No favorite songs found.</p>
      )}
    </div>
  );
}

export default FavoriteSongs;

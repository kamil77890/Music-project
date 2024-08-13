import React, { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";
import { TiHeart, TiHeartOutline } from "react-icons/ti";
import { gettingSongs } from "../../utils";
import axios from "axios";
import "./style.scss";

const SongsVideos = () => {
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongTitle, setCurrentSongTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(gettingSongs, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const playSong = (songId, songTitle) => {
    const SONGID = `t${songId}`;
    if (audio) {
      audio.pause();
    }
    if (isPlaying && currentSongTitle === songTitle) {
      setIsPlaying(false);
      return;
    }

    const songUrl = `http://127.0.0.1:5000/songs/${encodeURIComponent(
      SONGID
    )}.mp3`;

    const newAudio = new Audio(songUrl);
    setAudio(newAudio);
    setCurrentSongTitle(songTitle);

    newAudio.play().then(() => {
      setIsPlaying(true);
    });

    newAudio.onended = () => {
      setIsPlaying(false);
    };
  };

  const toggleLike = (songId) => {
    const updatedSongs = songs.map((song) =>
      song.id === songId ? { ...song, liked: !song.liked } : song
    );
    setSongs(updatedSongs);

    axios.post("http://127.0.0.1:5000/api/like", {
      id: songId,
      liked: updatedSongs.find((song) => song.id === songId).liked || false,
    });
  };
  // const songList = ()
  return (
    <div>
      {isVisible ? (
        <aside className="videos">
          <div>
            <h1>Music Player</h1>
          </div>
          <div>
            {songs.map((song) => (
              <div
                key={song.id}
                className="video"
                onClick={() => playSong(song.videoId, song.title)}
              >
                <div onClick={() => toggleLike(song.id)}>
                  {song.liked ? (
                    <TiHeart size={24} />
                  ) : (
                    <TiHeartOutline size={24} />
                  )}
                </div>
                <img src={song.src} alt="img" className="songImg" />
                <h5>{song.title}</h5>
              </div>
            ))}
          </div>
          <div>footer</div>
        </aside>
      ) : (
        <div className="visibleImage" onClick={() => setIsVisible(true)}>
          <BiSolidVideos size={44} />
        </div>
      )}
    </div>
  );
};

export default SongsVideos;

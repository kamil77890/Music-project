import React, { useState } from "react";
import "./AudioPlayer.scss";
import Playlist from "../context/Playlist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaPlay, FaPause, FaHeart } from "react-icons/fa";

const AudioPlayer = () => {
  const [audio, setAudio] = useState(new Audio());
  const [playingId, setPlayingId] = useState(null);
  const [isChosen, setIsChosen] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [CorrectPlaylist, setCorrectPlaylist] = useState(
    Playlist.map((song) => ({
      ...song,
      isLiked: likedSongs.includes(song.id),
    }))
  );

  const handlePlay = (path, id) => {
    if (!isChosen || playingId !== id) {
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

  const handleLikeToggle = (id) => {
    if (likedSongs.includes(id)) {
      setLikedSongs(likedSongs.filter((songId) => songId !== id));
    } else {
      setLikedSongs([...likedSongs, id]);
    }
  };

  const removeSong = (id) => {
    setShowOptions(false);
    setCorrectPlaylist(
      CorrectPlaylist.filter((item) => Number(item.id) !== id)
    );
  };

  return (
    <div className="audio-player">
      <h3>Music Shoot!</h3>
      <ul className="songs">
        {CorrectPlaylist.map((song) => (
          <li key={song.id} className="song">
            <div className="song">
              <div>
                <h3>{song.title}</h3>
              </div>

              <div className="controlers">
                <button
                  onClick={() => {
                    handlePlay(song.path, song.id);
                  }}
                  className="btn"
                >
                  {playingId === song.id ? <FaPause /> : <FaPlay />}
                </button>
                {song.isLiked ? (
                  <FaHeart onClick={() => handleLikeToggle(song.id)} />
                ) : (
                  <CiHeart onClick={() => handleLikeToggle(song.id)} />
                )}
                <BsThreeDotsVertical
                  onClick={() => setShowOptions(!showOptions)}
                />
                {showOptions && (
                  <select className="options" name="options" size="3">
                    <option value="Playlist">Add to Playlist</option>
                    <option
                      value="liked"
                      onClick={() =>
                        likedSongs.includes(song.id)
                          ? setLikedSongs(
                              likedSongs.filter((item) => item !== song.id)
                            )
                          : setLikedSongs([...likedSongs, song.id])
                      }
                    >
                      {likedSongs.includes(song.id)
                        ? "Remove from Likes"
                        : "Add to Likes"}
                    </option>
                    <option value="randomChoise">Get a random Choise</option>
                    <option value="Remove" onClick={() => removeSong(song.id)}>
                      Remove Song
                    </option>
                  </select>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioPlayer;

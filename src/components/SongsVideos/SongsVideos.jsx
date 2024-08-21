import React, { useState, useEffect } from "react";
import { BiSolidVideos } from "react-icons/bi";
import { TiHeart, TiHeartOutline } from "react-icons/ti";
import axios from "axios";
import "./style.scss";

const SongsVideos = () => {
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("/songs/songs.json");
        setSongs(response.data); // Set the fetched songs data
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();

    const intervalId = setInterval(fetchSongs, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const playSong = (videoId) => {
    if (audio) {
      audio.pause();
    }
    if (isPlaying && currentVideoId === videoId) {
      setIsPlaying(false);
      return;
    }

    const songUrl = `http://127.0.0.1:5000/songs/${encodeURIComponent(
      videoId
    )}.mp3`;

    const newAudio = new Audio(songUrl);
    setAudio(newAudio);
    setCurrentVideoId(videoId);

    newAudio.play().then(() => {
      setIsPlaying(true);
    });

    newAudio.onended = () => {
      setIsPlaying(false);
    };
  };

  const toggleLike = async (videoId) => {
    const updatedSongs = songs.map((song) => {
      const key = Object.keys(song)[0]; // Get the key (index) of the song
      if (song[key].videoId === videoId) {
        return {
          [key]: {
            ...song[key],
            liked: !song[key].liked,
          },
        };
      }
      return song;
    });
    setSongs(updatedSongs);

    try {
      await axios.post("http://127.0.0.1:5000/api/like", {
        id: videoId,
        liked:
          updatedSongs.find(
            (song) => song[Object.keys(song)[0]].videoId === videoId
          )[
            Object.keys(
              updatedSongs.find(
                (song) => song[Object.keys(song)[0]].videoId === videoId
              )
            )
          ].liked || false,
      });
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <div>
      {isVisible ? (
        <aside className="videos">
          <div>
            <h1>Music Player</h1>
          </div>
          <div>
            {songs.map((song, index) => {
              const key = Object.keys(song)[0]; 
              const songData = song[key];
              return (
                <div
                  key={index}
                  className="video"
                  onClick={() => playSong(songData.videoId)} 
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); 
                      toggleLike(songData.videoId);
                    }}
                  >
                    {songData.liked ? (
                      <TiHeart size={24} />
                    ) : (
                      <TiHeartOutline size={24} />
                    )}
                  </div>
                  <img src={songData.src} alt="img" className="songImg" />
                  <h5>{songData.title}</h5>
                </div>
              );
            })}
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

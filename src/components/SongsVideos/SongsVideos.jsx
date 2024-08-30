import React, { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.scss";

const SongsVideos = () => {
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

    const songUrl = `server-weld-one.vercel.app/songs/${encodeURIComponent(
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
      await axios.post("server-weld-one.vercel.app/api/like", {
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
    <aside>
      <div className={`visibleImage ${isVisible ? "expanded" : ""}`}>
        {isVisible ? (
          <div className="section0">
            <h1>Yt songs</h1>
            <div className="selection">
              <Link to="/downloaded-songs">
                <div>Downloaded songs</div>
              </Link>
              <Link to="/favorite-songs">
                <div>Favorite songs</div>
              </Link>
              <Link to="/info">
                <div>Info</div>
              </Link>
              <Link to="/about-us">
                <div>About Us!</div>
              </Link>
            </div>
            <div className="turnOff">
              <button className="Off" onClick={handleToggle}>
                <FaAngleLeft size={38} />
              </button>
            </div>
            <footer>
              <p>
                © Kamil & Bambus
                <br /> Sp.z o.o. 2024
              </p>
            </footer>
          </div>
        ) : (
          <div className="turnOn">
            <button className="On" onClick={handleToggle}>
              <FaAngleRight size={38} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SongsVideos;

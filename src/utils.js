import axios from "axios";
import { useState, useEffect } from "react";

export const getDuration = (song) => {
  const duration = song.contentDetails.duration;
  const re = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const match = duration.match(re);

  if (match) {
    const [, hours = "0", minutes = "0", seconds = "0"] = match;
    const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    return {
      minutes: totalMinutes.toString(),
      seconds: seconds,
    };
  } else {
    return { minutes: undefined, seconds: undefined };
  }
};

const transformData = (data) => {
  return {
    [data.id]: {
      liked: data.liked,
      title: data.title,
      src: data.src,
      videoId: data.videoId,
      duration: data.duration,
    },
  };
};

export const sendData = async (data) => {
  const transformedData = transformData(data);
  try {
    const response = await axios.post(
      "https://server-weld-one.vercel.app/api/data",
      transformedData,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export const gettingSongsIds = async () => {
  const response = await axios.get("/songs/songs.json");
  const data = response.data;

  const ids = data.map((item) => {
    const key = Object.keys(item)[0];
    return parseInt(key, 10);
  });

  const maxId = Math.max(...ids, 0);
  const newId = maxId + 1;

  return newId;
};
export const toggleLike = async (videoId, songs, setSongs) => {
  const updatedSongs = songs.map((song) => {
    const key = Object.keys(song)[0];
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

  await axios.post("https://server-weld-one.vercel.app/api/like", {
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
};

export const favoriteSongsSelector = async () => {
  const response = await axios.get("/songs/songs.json");
  const songs = response.data;

  const getLikedSongs = (songs) => {
    return songs.filter((song) => {
      const key = Object.keys(song)[0];
      return song[key].liked;
    });
  };

  return getLikedSongs(songs);
};
export const playSong = (
  songId,
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
) => {
  const song = songs.find((item) => Object.keys(item)[0] === songId);

  if (audio) {
    audio.pause();
    setAudio(null);
  }

  if (currentSongId === songId) {
    if (!isPlaying && audio) {
      audio.currentTime = savedTime;
      audio.play().then(() => setIsPlaying(true));
    }
    return;
  }

  if (!song) {
    console.error(`Song with ID ${songId} not found`);
    return;
  }

  const songUrl = `https://server-weld-one.vercel.app/${encodeURIComponent(
    songId
  )}.mp3`;

  const newAudio = new Audio(songUrl);
  setAudio(newAudio);
  setCurrentSongId(songId);

  newAudio.play().then(() => {
    setIsPlaying(true);
  });

  newAudio.onended = () => {
    setIsPlaying(false);

    const updatedSongList = songs.filter(
      (item) => Object.keys(item)[0] !== songId
    );
    setSongs(updatedSongList);

    if (updatedSongList.length > 0) {
      const nextSong = updatedSongList[0];
      const nextSongId = Object.keys(nextSong)[0];
      playSong(
        nextSongId,
        newAudio,
        setAudio,
        isPlaying,
        setIsPlaying,
        currentSongId,
        setCurrentSongId,
        savedTime,
        setSavedTime,
        updatedSongList,
        setSongs
      );
    }
  };

  newAudio.ontimeupdate = () => {
    setSavedTime(newAudio.currentTime);
  };
};

export const getRandomNumbers = (max) => {
  return Math.floor(Math.random() * max);
};

export const RandomSongSelector = async () => {
  try {
    const response = await axios.get("/songs/songs.json");
    const songs = response.data;

    if (songs.length === 0) return [];

    const randomIndex = Math.floor(Math.random() * songs.length);
    return songs[randomIndex];
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

export const formatSeconds = (seconds) => {
  const secondsInt = parseInt(seconds, 10);
  return secondsInt < 10 ? `0${secondsInt}` : secondsInt;
};

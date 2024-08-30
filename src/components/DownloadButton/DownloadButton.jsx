import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { sendData, getDuration, gettingSongsIds } from "../../utils";
import "./DownloadButton.scss";
import PropTypes from "prop-types";
import PopupC from "../Popup";

function DownloadButton(props) {
  const { theme } = useContext(ThemeContext);
  const { getString } = useLanguageContext();
  const { videoId, title, songs } = props;
  const [download, setDownload] = useState(false);
  const [lastId, setLastId] = useState(null);

  const handleDownload = async () => {
    setDownload(true);
    try {
      const newId = await gettingSongsIds();
      setLastId(newId);

      const response = await axios.get(
        `https://server-weld-one.vercel.app/mp3?videoId=${videoId}&id=${newId}`,
        {
          responseType: "blob",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      saveAs(response.data, `${title}.mp3`);

      await sendSongData(newId);
    } finally {
      setDownload(false);
    }
  };

  const sendSongData = async (newId) => {
    const song = songs.find((song) => song.id === videoId);
    console.log("Song:", song);
    if (song) {
      try {
        const response = await sendData({
          id: newId,
          liked: false,
          title: song.snippet.title,
          src: song.snippet.thumbnails.high.url,
          videoId: videoId,
          duration: getDuration(song),
        });
        console.log("Response:", response);
      } catch (error) {
        console.error("Error sending song data:", error);
      }
    }
  };

  useEffect(() => {
    if (download) {
      const timer = setTimeout(() => {
        setDownload(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [download]);

  return (
    <div>
      <button className={`download-button ${theme}`} onClick={handleDownload}>
        {getString("download")}
      </button>
      {download ? <PopupC /> : null}
    </div>
  );
}

DownloadButton.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      snippet: PropTypes.shape({
        title: PropTypes.string.isRequired,
        thumbnails: PropTypes.shape({
          high: PropTypes.shape({
            url: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default DownloadButton;

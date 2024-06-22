import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { sendData, getDuration } from "../../utils";
import "./DownloadButton.scss";
import PropTypes from "prop-types";
import PopupC from "../Popup";

function DownloadButton(props) {
  const { theme } = useContext(ThemeContext);
  const { getString } = useLanguageContext();
  const { videoId, title, songs } = props;
  const [download, setDowloand] = useState(false);

  const handleDownload = async () => {
    setDowloand(true);
    const response = await axios.get(
      `http://127.0.0.1:5000/mp3?id=${videoId}`,
      {
        responseType: "blob",
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );

    saveAs(response.data, `${title}.mp3`);
    sendSongData();
  };

  const song = songs.filter((song) => {
    return song.id === videoId;
  });

  const sendSongData = () => {
    const song = songs.find((song) => song.id === videoId);
    if (song) {
      sendData({
        title: song.snippet.title,
        src: song.snippet.thumbnails.high.url,
        videoId: videoId,
        duration: getDuration(song),
      });
    }
  };

  useEffect(() => {
    if (download) {
      setTimeout(() => {
        setDowloand(false);
      }, 5000);
    }
  }, [download]);

  return (
    <div>
      <button className={(theme, "download-button")} onClick={handleDownload}>
        {getString("download")}
      </button>
      {download ? <PopupC /> : null}
    </div>
  );
}

export default DownloadButton;

DownloadButton.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

import axios from "axios";
import React, { useContext } from "react";
import { saveAs } from "file-saver";
import { useLanguageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./DownloadButton.scss";
import PropTypes from "prop-types";

function DownloadButton(props) {
  const { theme } = useContext(ThemeContext);
  const { getString } = useLanguageContext();
  const { videoId, title } = props;
  const handleDownload = async () => {
    const response = await axios.get(
      `http://127.0.0.1:5000/mp3?id=${videoId}`,
      {
        responseType: "blob",
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );

    saveAs(response.data, `${title}.mp3`);
  };

  return (
    <button className={(theme, "download-button")} onClick={handleDownload}>
      {getString("download")}
    </button>
  );
}

export default DownloadButton;

DownloadButton.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

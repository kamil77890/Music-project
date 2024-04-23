import axios from "axios";
import React from "react";
import { saveAs } from "file-saver";

function DownloadButton(props) {
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

  return <button onClick={handleDownload}>Download</button>;
}

export default DownloadButton;


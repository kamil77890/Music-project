import axios from "axios";
import React from "react";

function DownloadButton(props) {
  const { videoId, title } = props;
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/mp3?id=${videoId}`,
        {
          responseType: "blob",
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.mp3`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Błąd podczas pobierania pliku: ", error);
      alert("Błąd podczas pobierania pliku.");
    }
  };

  return <button onClick={handleDownload}>Download</button>;
}

export default DownloadButton;
// fromt -> flask ->  download_button
//front -> button

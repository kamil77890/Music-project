import { useEffect, useState } from "react";
import axios from "axios";

export default async function getVideo(id) {
  const url = `http://localhost:5000/mp3?id=${id}`;
  return axios.get(url, { headers: { "Access-Control-Allow-Origin": "*" } });
}

/* import axios from 'axios';
import React from 'react';

function DownloadButton() {
  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:5000/download&#39;, {
        responseType: 'blob', // Bardzo ważne dla pobierania plików binarnych
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'nazwa_pliku.mp3'); // Nazwa pliku, którą chcesz ustawić
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Błąd podczas pobierania pliku: ', error);
      alert('Błąd podczas pobierania pliku.');
    }
  };

  return <button onClick={handleDownload}>Download</button>;
}

export default DownloadButton;
*/
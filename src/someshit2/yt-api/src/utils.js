import axios from "axios";

export default async function fetchSong(videoId) {
  const url =
    "https://youtube-mp3-converter.p.rapidapi.com/widget=rapidapi&action=button&id=aJOTlE1K90k&lang=en&format=mp3";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3440f060a0msh00df6ea2ed7075fp1f92ddjsn0a487c5badb6",
      "X-RapidAPI-Host": "youtube-mp3-converter.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

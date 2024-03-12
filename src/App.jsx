import React, { useEffect, useState } from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import SomeShit from "./someshit2/PlayGround/SomeShit";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [playlist, setPlaylist] = useState([]); // State for playlist data
  const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing

  const [audio, setAudio] = useState(new Audio());

  const handlePlay = (path, id) => {
    if (!isPlaying) {
      console.log(path);
      setIsPlaying(true);
      audio.src = path;
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };

  useEffect(() => {
    const fetchSpotifyToken = async () => {
      const clientID = "1089d7669d05473c91c9d8d7e6a13db2";
      const clientSecret = "b65a1596cbee4f6ebfbf0dedf412cd72";
      const url = "https://accounts.spotify.com/api/token";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);

        // Fetch the playlist after obtaining the access token
        const playlistResponse = await fetch(
          "https://api.spotify.com/v1/playlists/37i9dQZF1DXbrUpGvoi3TS",
          {
            headers: {
              Authorization: "Bearer " + data.access_token,
            },
          }
        );

        const playlistData = await playlistResponse.json();
        setPlaylist(playlistData.tracks.items);
      }
    };
    const fetchTrack = async (trackId, accessToken) => {
      const url = `https://api.spotify.com/v1/tracks/${trackId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Tutaj możesz obsłużyć dane zwrócone przez API
      } else {
        console.error("Error fetching track:", response.statusText);
      }
    };

    // Przykładowe użycie funkcji fetchTrack
    // Załóżmy, że masz już uzyskany token dostępu jako `accessToken`
    const trackId = "0u2P5u6lvoDfwTYjAADbn4";
    fetchTrack(trackId, accessToken);

    fetchSpotifyToken();
  }, []);

  return (
    <div className="App">
      {accessToken ? (
        <div>
          <h1>Access Token: {accessToken}</h1>
          {playlist.length > 0 ? (
            <div>
              <h2>Playlist Tracks:</h2>
              {playlist.map((track, index) => (
                <div key={index}>
                  <h3>{track.track.name}</h3>
                  <p>{track.track.artists[0].name}</p>
                  <button
                    onClick={() => handlePlay(track.track.href, track.track.id)}
                  >
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading playlist...</p>
          )}
        </div>
      ) : (
        <p>Loading access token...</p>
      )}
    </div>
  );
}

export default App;

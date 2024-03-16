import React from "react";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=1089d7669d05473c91c9d8d7e6a13db2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
  return (
    <div>
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  );
}

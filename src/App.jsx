import React from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import SomeShit from "./someshit2/PlayGround/SomeShit";

function App() {
  return (
    <main className="music">
      <div className="audio-players">
        <AudioPlayer />
        {/* <div style={{ padding: "500px" }}></div>
        <SomeShit /> */}
      </div>
    </main>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import {
  sound1,
  sound2,
  sound3,
  sound4,
  sound5,
  sound6,
  sound7,
  sound8,
  sound9,
  sound10,
  sound11,
  sound12,
} from "./to_Import";

function App() {
  return (
    <>
      <main className="music">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <AudioPlayer src={sound1} id={1} />
          <AudioPlayer src={sound2} id={2} />
          <AudioPlayer src={sound3} id={3} />
          <AudioPlayer src={sound4} id={4} />
          <AudioPlayer src={sound5} id={5} />
          <AudioPlayer src={sound6} id={6} />
          <AudioPlayer src={sound7} id={7} />
          <AudioPlayer src={sound8} id={8} />
          <AudioPlayer src={sound9} id={9} />
          <AudioPlayer src={sound10} id={10} />
          <AudioPlayer src={sound11} id={11} />
          <AudioPlayer src={sound12} id={12} />
        </div>
      </main>
    </>
  );
}

export default App;

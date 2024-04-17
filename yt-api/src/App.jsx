import { useState } from "react";
import YouTubeVideos from "./components/YT-api";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <YouTubeVideos />
      </div>
    </>
  );
}

export default App;



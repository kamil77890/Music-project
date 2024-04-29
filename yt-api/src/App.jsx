import { useState } from "react";
import YouTubeVideos from "./components/YT-api/search";
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

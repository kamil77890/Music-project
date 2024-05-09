import { useState } from "react";
import YouTubeVideos from "./components/YT-api";
import LanguageDropdown from "./components/LanguageDropdown/LanguageDropdown";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LanguageDropdown />
      <div>
        <YouTubeVideos />
      </div>
    </>
  );
}

export default App;

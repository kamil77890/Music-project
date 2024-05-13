import { useState } from "react";
import YouTubeVideos from "./components/YT-api";
import LanguageDropdown from "./components/LanguageDropdown/LanguageDropdown";
import "./App.css";
import Footer from "./components/Footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <LanguageDropdown />
      <div>
        <YouTubeVideos />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;

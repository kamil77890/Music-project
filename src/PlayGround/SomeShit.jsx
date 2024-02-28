import PLaylist from "../components/context/Playlist";
import { useState } from "react";
import "./SomeShit.scss";

function SomeShit() {
  const [isChoosen, setIsChoosen] = useState(null);
  const [audio] = useState(new Audio());

  const handlePLay = (path) => {
    const song = path;
    setIsChoosen(true);
    audio.src = song;
    audio.play();
  };
  return (
    <div>
      <h3>RRRRRRRRRRRRRR</h3>
      <ul>
        {PLaylist.map((song, i) => (
          <li
            key={i}
            onClick={() => {
              {
                handlePLay(song.path);
              }
            }}
          >
            <div>
              <button>
                <h4>ja</h4>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SomeShit;

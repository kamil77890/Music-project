import PLaylist from "../components/context/Playlist";
import { useState } from "react";

function SomeShit() {
  const [isChoosen, setIsChoosen] = useState(null);
  const [audio] = useState(new Audio());

  const handlePLay = (path) => {
    setIsChoosen(true);
    audio.src = path;
    audio.play();
  };
  return (
    <div>
      <h1>RRRRRRRRRRRRRR</h1>
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
              <h1>{song.title}</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SomeShit;

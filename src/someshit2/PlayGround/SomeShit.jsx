import PLaylist from "../../components/context/Playlist";
import { useState } from "react";
import "./SomeShit.scss";
import song1 from "../../to_Import";

function SomeShit() {
  const [isChoosen, setIsChoosen] = useState(null);
  const [audio] = useState(new Audio());

  const handlePLay = (path) => {
    const srcF = path;
    setIsChoosen(true);
    audio.src = path;
    audio.play();
  };
  return (
    <div>
      <h3>Music Shoot!</h3>
      <ul>
        {PLaylist.map((song, index) => (
          <li
            key={index}
            onClick={() => {
              {
                handlePLay(song.path);
              }
            }}
          >
            <div>
              <h3>{song.id}</h3>
              <h5>{song.path}</h5>
              <button>
                <h4>{song.title}</h4>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SomeShit;

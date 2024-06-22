import { useEffect, useState } from "react";
import "./Popup.css";

function Popup() {
  const [time, setTime] = useState(5);
  useEffect(() => {
    setTimeout(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);
  });
  return (
    <div className="popup">
      <h4>Download started... {time}</h4>
    </div>
  );
}
export default Popup;

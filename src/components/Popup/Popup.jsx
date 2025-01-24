import { useEffect, useState } from "react";
import "./Popup.css";

function Popup() {
  const [time, setTime] = useState(6);

  useEffect(() => {

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
        }
        return prevTime - 1;
      });
    }, 1000);


    return () => clearInterval(timer);
  }, []);
  return (
    <div className="popup">
      <h4>Download started... {time}</h4>
    </div>
  );
}

export default Popup;

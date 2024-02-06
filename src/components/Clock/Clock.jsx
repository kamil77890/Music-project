import React, { useState, useEffect } from "react";

const Clock = (props) => {
  const [currentTime, setCurrentTime] = useState(undefined);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      console.log("tick");
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentDate = new Date(currentTime);
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  const seconds = currentDate.getSeconds()

  return (
    <div className="clock">
      <span>{hours < 10 ? `0${hours}` : hours}</span>:
      <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
      <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
    </div>
  );
};

export default Clock;

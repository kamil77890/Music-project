import React, { useState, useEffect } from "react";
import "./Communicator.scss";

function Communicator() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <>
      {show && (
        <div className="info-component">
          <p>Już prawie gotowe!</p>
        </div>
      )}
    </>
  );
}

export default Communicator;

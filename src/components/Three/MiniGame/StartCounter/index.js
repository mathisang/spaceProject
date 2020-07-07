import React, { useEffect, useRef, useState } from "react";
import "./startcounter.scss";

export default ({ setGameStatus }) => {
  const counter = useRef(false);
  const [startCounter, setStartCounter] = useState(5);
  useEffect(() => {
    startCounter > 0
      ? (counter.current = setTimeout(() => {
          setStartCounter(startCounter - 1);
        }, 1000))
      : setGameStatus(true);
  }, [startCounter]);
  return (
    <div className="start-counter">
      <h2>{startCounter}</h2>
    </div>
  );
};

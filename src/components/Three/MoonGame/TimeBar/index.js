import React from "react";
import { useSpring, a } from "react-spring";
import "./timebar.scss";

export default ({ ticState }) => {
  const props = useSpring({
    percent: `${(ticState * 100) / 50}%`,
  });
  const lourd = 50;
  return (
    <div className="time-bar-container">
      <a.div
        style={{ width: props.percent }}
        className="time-bar-content"
      ></a.div>
    </div>
  );
};

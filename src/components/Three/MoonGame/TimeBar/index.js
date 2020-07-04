import React from "react";
import { useSpring, a } from "react-spring";
import "./timebar.scss";

export default () => {
  const props = useSpring({
    percent: 50,
  });
  return (
    <div className="time-bar-container">
      <a.div
        style={{ width: props.percent }}
        className="time-bar-content"
      ></a.div>
    </div>
  );
};

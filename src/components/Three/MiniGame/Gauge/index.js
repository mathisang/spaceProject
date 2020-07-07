import React from "react";
import { useSpring, a } from "react-spring";
import "./gaugeMiniGame.scss";
import { gaugeBackground } from "../../../../assets/images/index";

export default ({ asteroid, globalAsteroid }) => {
  const props = useSpring({
    percent: `${100 - ((asteroid + globalAsteroid) * 100) / 90}%`,
  });
  return (
    <a.div
      className="space-gauge-container"
      style={{ backgroundImage: `url(${gaugeBackground})` }}
    >
      <a.div
        style={{ height: props.percent }}
        className="space-gauge-content"
      />
    </a.div>
  );
};

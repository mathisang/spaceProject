import React, { useMemo, useState } from "react";
import { useSpring, a } from "react-spring";
import "./gaugeMiniGame.scss";

export default ({ asteroid, globalAsteroid }) => {
  const props = useSpring({
    percent: ((asteroid + globalAsteroid) * 200) / 150,
  });
  return (
    <div className="space-gauge-container">
      <a.div style={{ height: props.percent }} className="space-gauge-content">
        {props.value}
      </a.div>
    </div>
  );
};

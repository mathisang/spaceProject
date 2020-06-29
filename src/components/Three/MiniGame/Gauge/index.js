import React, { useMemo, useState } from "react";
import { useSpring, animated } from "react-spring";
import "./gaugeMiniGame.scss";

export default ({ asteroid, obstaclePart }) => {
  const [globalAsteroid, setGlobalAsteroid] = useState(0);
  const props = useSpring({
    percent: ((asteroid + globalAsteroid) * 200) / 150,
  });
  useMemo(() => {
    obstaclePart !== 0 && setGlobalAsteroid(globalAsteroid + 50);
  }, [obstaclePart]);
  return (
    <div className="space-gauge-container">
      <animated.div
        style={{ height: props.percent }}
        className="space-gauge-content"
      >
        {props.value}
      </animated.div>
    </div>
  );
};

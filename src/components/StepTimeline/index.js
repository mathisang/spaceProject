import React, { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import {
  earth,
  moon,
  helmet,
  rocket,
  flagUsa,
  flagUrss,
} from "../../assets/images";
import "./stepTimeline.scss";

export default function ({
  year,
  season,
  step,
  setRocketPosition,
  rocketPosition,
  gameBadge,
  stepTutorial,
}) {
  useEffect(() => {
    year === 1958
      ? setRocketPosition(0)
      : setRocketPosition(rocketPosition + 2);
  }, [season]);

  const flagName = gameBadge.flightGame === "usa" ? flagUsa : flagUrss;

  const positionRocket = useSpring({
    left: rocketPosition + `%`,
  });

  return (
    <div
      className="timeline"
      style={
        stepTutorial === 7 || stepTutorial === 8
          ? { zIndex: "99999" }
          : { zIndex: "unset" }
      }
    >
      <div>
        <img src={earth} alt="" />
      </div>
      <animated.div className="rocketStep" style={positionRocket}>
        <img src={rocket} alt="" />
      </animated.div>
      <div className="stepHelmet">
        <img src={step.id === 0 ? helmet : step.id > 0 && flagName} alt="" />
      </div>
      <div>
        <img src={moon} alt="" />
      </div>
    </div>
  );
}

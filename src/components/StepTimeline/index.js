import React, { useContext, useEffect, useState } from "react";
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
}) {
  useEffect(() => {
    year === 1958
      ? setRocketPosition(0)
      : setRocketPosition(rocketPosition + 2);
  }, [season]);

  const flagName = gameBadge.flightGame === "usa" ? flagUsa : flagUrss;

  return (
    <div className="timeline">
      <div>
        <img src={earth} alt="" />
      </div>
      <div className="rocketStep" style={{ left: rocketPosition + `%` }}>
        <img src={rocket} alt="" />
      </div>
      <div className="stepHelmet">
        <img src={step.id <= 1 ? helmet : step.id > 1 && flagName} alt="" />
      </div>
      <div>
        <img src={moon} alt="" />
      </div>
    </div>
  );
}

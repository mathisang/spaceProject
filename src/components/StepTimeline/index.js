import React, { useContext, useEffect, useState } from "react";
import { earth, moon, helmet, rocket, flagUsa } from "../../assets/images";
import "./stepTimeline.scss";

export default function ({
  stepCards,
  year,
  season,
  ListSeasons,
  step,
  setRocketPosition,
  rocketPosition,
}) {
  useEffect(() => {
    setRocketPosition(rocketPosition + 2.55);
  }, [season]);

  console.log(step.id);

  // Avancement linéaire à rendre dynamique avec les dates des étapes

  return (
    <div className="timeline">
      <div>
        <img src={earth} alt="" />
      </div>
      <div className="rocketStep" style={{ left: rocketPosition + `%` }}>
        <img src={rocket} alt="" />
      </div>
      <div>
        <img src={step.id === 0 ? helmet : step.id > 0 && flagUsa} alt="" />
      </div>
      <div>
        <img src={moon} alt="" />
      </div>
    </div>
  );
}

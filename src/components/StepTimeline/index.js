import React, { useContext, useEffect, useState } from "react";
import { earth, moon, helmet, rocket } from "../../assets/images";
import "./stepTimeline.scss";

export default function ({ stepCards, year, season, ListSeasons, step }) {
  const [rocketPosition, setRocketPosition] = useState(0);

  useEffect(() => {
    setRocketPosition(rocketPosition + 2.55);
  }, [season]);

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
        <img src={helmet} alt="" />
      </div>
      <div>
        <img src={helmet} alt="" />
      </div>
      <div>
        <img src={moon} alt="" />
      </div>
    </div>
  );
}

import React from "react";
import {
  firstExit,
  firstFlight,
  firstStep,
  flagUrss,
  flagUsa,
} from "../../../assets/images";

export default function ({ gameBadge }) {
  const Badge = ({ image, winner }) => {
    return (
      <div className="badge">
        <div className={`icon ${winner === false && "badgeNotCompleted"}`}>
          <img src={image} alt="" />
          <img
            className="flagIcon"
            src={winner === "usa" ? flagUsa : flagUrss}
            alt=""
          />
        </div>
        <span>
          {image === firstFlight
            ? "Premier vol dans l'espace"
            : image === firstExit
            ? "Première sortie"
            : "Premier pas sur la lune"}
        </span>
      </div>
    );
  };

  return (
    <div className="badgesList">
      <Badge image={firstFlight} winner={gameBadge.flightGame} />
      <Badge image={firstExit} winner={gameBadge.secondGame} />
      <Badge image={firstStep} winner={gameBadge.moonGame} />
    </div>
  );
}

import React from "react";
import {
  firstExit,
  firstFlight,
  firstStep,
  flagUrss,
  flagUsa,
} from "../../../assets/images";

export default function () {
  const Badge = ({ image, winner }) => {
    return (
      <div className="badge">
        <div className={`icon ${winner === "" && "badgeNotCompleted"}`}>
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
      <Badge image={firstFlight} winner="usa" />
      <Badge image={firstExit} winner="" />
      <Badge image={firstStep} winner="" />
    </div>
  );
}

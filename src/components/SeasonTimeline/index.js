import React, { useContext, useEffect, useState } from "react";
import CardContext from "../Cards/CardContext";
import "./season.scss";

export default function ({
  year,
  setYear,
  season,
  setSeason,
  ListSeasons,
  stepTutorial,
}) {
  const { selectedCardId, setSelectedCardId } = useContext(CardContext);

  function setCurrentDate() {
    switch (season) {
      case 3:
        setSeason(0);
        setYear(year + 1);
        break;
      default:
        setSeason(season + 1);
        break;
    }
  }

  // Attribue la nouvelle saison
  useEffect(() => {
    setCurrentDate();
  }, [selectedCardId]);

  return (
    <div
      className="calendar"
      style={
        stepTutorial === 4 || stepTutorial === 5
          ? { opacity: ".35" }
          : { opacity: "1" }
      }
    >
      <div className="currentSeason stat">{ListSeasons[season]}</div>
      <div className="currentYear year">{year}</div>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import CardContext from "../Cards/CardContext";
import "./season.scss";

export default function ({ year, setYear, season, setSeason, ListSeasons }) {
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
    <div className="calendar">
      <div className="currentSeason stat">{ListSeasons[season]}</div>
      <div className="currentYear year">{year}</div>
    </div>
  );
}

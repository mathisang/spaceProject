import React, { useContext, useEffect } from "react";
import timesSteps from "../../datas/time.json";
import CardContext from "../Cards/CardContext";
import "./season.scss";

export default function ({ timeStep, setTimeStep }) {
  const { selectedCardId, setSelectedCardId } = useContext(CardContext);

  // Attribue la nouvelle saison
  useEffect(() => {
    selectedCardId >= 0 && setTimeStep(timeStep + 1);
  }, [selectedCardId]);

  return (
    <div className="calendar">
      <div className="currentSeason stat">{timesSteps[timeStep].season}</div>
      <div className="currentYear year">{timesSteps[timeStep].year}</div>
    </div>
  );
}

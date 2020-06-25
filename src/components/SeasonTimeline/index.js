import React, { useContext, useEffect } from "react";
import timesSteps from "../../datas/time.json";
import CardContext from "../Cards/CardContext";

export default function ({ timeStep, setTimeStep }) {
  const { selectedCardId, setSelectedCardId } = useContext(CardContext);

  // Attribue la nouvelle saison
  useEffect(() => {
    selectedCardId > 0 && setTimeStep(timeStep + 1);
  }, [selectedCardId]);

  return <div className="">{timesSteps[timeStep].name}</div>;
}

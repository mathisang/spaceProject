import React, { useContext, useState } from "react";
import "./step-card.scss";

export default function ({
  step,
  year,
  season,
  ListSeasons,
  gameOn,
  setGameOn,
  steps,
  lifePoints,
}) {
  function startGame() {
    setGameOn(true);
  }

  // Message de réussite ou défaite de l'événement
  const Text = ({ step }) => {
    return (
      <div className="stepContent">
        <h2 className="titleBig">{steps[step.id].label}</h2>
        {/*<p className="description">{steps[step.id].name}</p>*/}
        <p className="description">
          Phrase a re-dynamiser quand on aura API a jour
        </p>
        <p className="gaugeManage">
          Suite à vos décisions, vous bénéficez de :
        </p>
        <span className="numberLive">{lifePoints} x</span>
      </div>
    );
  };

  const MiniGameButton = () => {
    return (
      <button onClick={startGame} className="small">
        C'est parti !
      </button>
    );
  };

  // Affichage de l'événement
  return (
    <div className="boxStep">
      {gameOn === false && (
        <div>
          <div className="calendar">
            <div className="currentSeason stat">{ListSeasons[season]}</div>
            <div className="currentYear year">{year}</div>
          </div>
          <Text step={step} />
          <MiniGameButton />
        </div>
      )}
    </div>
  );
}

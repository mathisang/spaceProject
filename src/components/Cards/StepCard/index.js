import React, { useContext, useState } from "react";
import steps from "../../../datas/stepCards.json";
import "./step-card.scss";
import MiniGame from "../../MiniGame";

export default function ({
  step,
  setStep,
  setEnd,
  year,
  season,
  ListSeasons,
  gameOn,
  setGameOn,
}) {
  function startGame() {
    setGameOn(true);
  }
  console.log(gameOn);

  // Message de réussite ou défaite de l'événement
  const Text = ({ step }) => {
    return (
      <div className="stepContent">
        <h2 className="titleBig">{steps[step.id].label}</h2>
        <p className="description">{steps[step.id].name}</p>
        <p className="gaugeManage">
          Suite à vos décisions, vous bénéficez de :
        </p>
        <span className="numberLive">3 x</span>
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
      {gameOn === true && (
        <MiniGame step={step} setStep={setStep} setEnd={setEnd} />
      )}
    </div>
  );
}

import React, { useContext, useState } from "react";
import steps from "../../../datas/stepCards.json";
import "./step-card.scss";
import MiniGame from "../../MiniGame";

export default function ({ step, setStep, setEnd }) {
  const [gameOn, setGameOn] = useState(false);

  function startGame() {
    setGameOn(true);
    console.log(gameOn);
  }

  // Message de réussite ou défaite de l'événement
  const Text = ({ step }) => {
    return (
      <div className="text-container">
        <h3>{steps[step.id].stepSeason}</h3>
        <h2>{steps[step.id].label}</h2>
        <p>{steps[step.id].name}</p>
      </div>
    );
  };

  const MiniGameButton = () => {
    return <button onClick={startGame}>C'est parti</button>;
  };

  // Affichage de l'événement
  return (
    <div className="fullScreen">
      {gameOn === false && (
        <div>
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

import React, { useContext, useState } from "react";
import steps from "../../datas/stepCards.json";
import GaugeContext from "../Gauge/GaugeContext";

export default function ({ setStep, step, setEnd }) {
  // Message de réussite ou défaite de l'événement
  const Text = () => {
    return (
      <div className="text-container">
        <h3>Jeu 1</h3>
        <p>
          Guidez votre vaisseau à travers les astéroïdes, quittez l’atmosphère
          et soyez le premier à envoyer un homme dans l’espace.
        </p>
      </div>
    );
  };

  const { gauge, setGauge } = useContext(GaugeContext);
  const [gameStatus, setGameStatus] = useState(false);

  const GameButton = ({ result }) => {
    const handleClick = (result) => {
      setGauge({
        money: gauge.money + steps[step.id][result].money,
        opinion: gauge.opinion + steps[step.id][result].opinion,
        search: gauge.search + steps[step.id][result].search,
      });
      setGameStatus(result);
    };
    return (
      <button
        onClick={() => {
          handleClick(result);
        }}
      >
        {result === "win" ? "Gagner" : "Perdre"}
      </button>
    );
  };

  const EndGame = () => {
    const skipGame = () => {
      setStep({ isActive: false, id: step.id + 1 });
    };
    return (
      <div>
        <h3>{steps[step.id][gameStatus].label}</h3>
        <p>{steps[step.id][gameStatus].message}</p>
        <button onClick={skipGame}>Continuer</button>
      </div>
    );
  };

  // Affichage de l'événement
  return (
    <div>
      {gameStatus === false && (
        <div>
          <Text />
          <GameButton result="win" />
          <GameButton result="loose" />
        </div>
      )}
      {gameStatus !== false && (
        <EndGame step={step} setStep={setStep} setEnd={setEnd} />
      )}
    </div>
  );
}

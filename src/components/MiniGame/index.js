import React, { useContext, useState } from "react";
import steps from "../../datas/stepCards.json";
import GaugeContext from "../Gauge/GaugeContext";
import TimelineContext from "../Timeline/TimelineContext";

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

  const WinGame = () => {
    const handleClick = () => {
      setGauge({
        money: gauge.money + steps[step.id].win.money,
        opinion: gauge.opinion + steps[step.id].win.opinion,
        search: gauge.search + steps[step.id].win.search,
      });
      console.log("Gagner");
      setGameStatus("win");
    };
    return <button onClick={handleClick}>Gagner</button>;
  };

  const LooseGame = () => {
    const handleClick = () => {
      setGauge({
        money: gauge.money + steps[step.id].loose.money,
        opinion: gauge.opinion + steps[step.id].loose.opinion,
        search: gauge.search + steps[step.id].loose.search,
      });
      console.log("Perdu");
      setGameStatus("loose");
    };
    return <button onClick={handleClick}>Perdre</button>;
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
          <WinGame />
          <LooseGame />
        </div>
      )}
      {gameStatus !== false && (
        <EndGame step={step} setStep={setStep} setEnd={setEnd} />
      )}
    </div>
  );
}

import React, { useContext, useState } from "react";
import steps from "../../../datas/stepCards.json";
import TimelineContext from "../../Timeline/TimelineContext";
import "./step-card.scss";
import GaugeContext from "../../Gauge/GaugeContext";
import MiniGame from "../../MiniGame"

export default function ({ step, setStep, setEnd }) {
  const [gameOn, setGameOn] = useState(false);

  function startGame() {
    setGameOn(true);
    console.log(gameOn);
  }

  // Message de réussite ou défaite de l'événement
  const Text = ({ step }) => {
    const { timeline, setTimeline } = useContext(TimelineContext);
    return (
      <div className="text-container">
        <h3>{steps[step.id].stepSeason}</h3>
        <h2>{steps[step.id].label}</h2>
        <p>{steps[step.id].name}</p>
      </div>
    );
  };

  // Continuer le jeu et mettre à jour les jauge en fonction de la réussite
  const ContinueButton = ({ setStep, step, setEnd }) => {
    const { timeline, setTimeline } = useContext(TimelineContext);
    const { gauge, setGauge } = useContext(GaugeContext);
    const handleClick = () => {
      step.id === steps.length - 1
        ? setEnd(true)
        : timeline.usa > timeline.urss
        ? setGauge({
            money: gauge.money + steps[step.id].win.money,
            opinion: gauge.opinion + steps[step.id].win.opinion,
            search: gauge.search + steps[step.id].win.search,
          })
        : setGauge({
            money: gauge.money + steps[step.id].loose.money,
            opinion: gauge.opinion + steps[step.id].loose.opinion,
            search: gauge.search + steps[step.id].loose.search,
          });
      setStep({ isActive: false, id: step.id + 1 });
    };
    return <button onClick={handleClick}>Continuer</button>;
  };

  const MiniGameButton = () => {
    return <button onClick={startGame}>C'est parti</button>;
  };

  // Affichage de l'événement
  return (
    <div className="fullScreen">
      <Text step={step} />
      <MiniGameButton />
        {gameOn === true && (
            <MiniGame step={step} setStep={setStep} setEnd={setEnd} />
        )}
    </div>
  );
}

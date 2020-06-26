import React, { useContext } from "react";
import cards from "../../../datas/stepCards.json";
import TimelineContext from "../../Timeline/TimelineContext";
import "./step-card.scss";
import GaugeContext from "../../Gauge/GaugeContext";

// Message de réussite ou défaite de l'événement
const Text = ({ step }) => {
  const { timeline, setTimeline } = useContext(TimelineContext);
  return (
    <div className="text-container">
      <p>{cards[step.id].name}</p>
      <p>
        {timeline.usa > timeline.urss
          ? cards[step.id].win.message
          : cards[step.id].loose.message}
      </p>
    </div>
  );
};

// Continuer le jeu et mettre à jour les jauge en fonction de la réussite
const ContinueButton = ({ setStep, step, setEnd }) => {
  const { timeline, setTimeline } = useContext(TimelineContext);
  const { gauge, setGauge } = useContext(GaugeContext);
  const handleClick = () => {
    step.id === cards.length - 1
      ? setEnd(true)
      : timeline.usa > timeline.urss
      ? setGauge({
          money: gauge.money + cards[step.id].win.money,
          opinion: gauge.opinion + cards[step.id].win.opinion,
          search: gauge.search + cards[step.id].win.search,
        })
      : setGauge({
          money: gauge.money + cards[step.id].loose.money,
          opinion: gauge.opinion + cards[step.id].loose.opinion,
          search: gauge.search + cards[step.id].loose.search,
        });
    setStep({ isActive: false, id: step.id + 1 });
  };
  return <button onClick={handleClick}>Continuer</button>;
};

// Affichage de l'événement
export default ({ step, setStep, setEnd }) => (
  <div className="card-container step-card">
    <Text step={step} />
    <ContinueButton step={step} setStep={setStep} setEnd={setEnd} />
  </div>
);

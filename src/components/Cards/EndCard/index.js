import React, { useContext } from "react";
import GaugeContext from "../../Gauge/GaugeContext";
import TimelineContext from "../../Timeline/TimelineContext";
import timesSteps from "../../../datas/time.json";

// Écran de victoire
const WinText = ({ timeStep }) => {
  const { gauge, setGauge } = useContext(GaugeContext);
  const { timeline, setTimeline } = useContext(TimelineContext);
  return (
    <div>
      <p>
        Félicitations ! Vous avez fait de l'USA le vainqueur de la conquête
        spaciale. Vous êtes parvenu à poser le premier pas sur la lune en{" "}
      </p>
      <h2>{timesSteps[timeStep].name}</h2> et par la même occasion écraser
      l'URSS
      <br />
      Score :
      <br />
      argent : {gauge.money}
      <br />
      opinion : {gauge.opinion}
      <br />
      recherche : {gauge.search}
      <br />
      Avancée de l'URSS : {timeline.urss}%
    </div>
  );
};

// Écran de défaite
const LooseText = ({ timeStep }) => {
  const { gauge, setGauge } = useContext(GaugeContext);
  const { timeline, setTimeline } = useContext(TimelineContext);
  return (
    <div>
      <p>
        Aie ! Vous y étiez presque, dépassé sur la ligne d'arrivée... L'URSS est
        parvenu à poser le premier pas sur la lune avant vous...
      </p>
      <h2>{timesSteps[timeStep].name}</h2> restera à jamais l'époque où les
      états-unis se sont fait ridiculiser par l'URSS et mis hors jeu de la
      conquête spaciale.
      <br />
      Score :
      <br />
      argent : {gauge.money}
      <br />
      opinion : {gauge.opinion}
      <br />
      recherche : {gauge.search}
      <br />
      Votre triste avancée: {timeline.usa}%
    </div>
  );
};

// Bouton "Rejouer"
const RestartButton = () => {
  function restartGame() {
    window.location.reload(false);
  }
  return <button onClick={restartGame}>Rejouer</button>;
};

// Affichage de l'écran de fin
export default ({ timeStep }) => {
  const { timeline, setTimeline } = useContext(TimelineContext);
  return (
    <div>
      {timeline.usa > timeline.urss ? (
        <WinText timeStep={timeStep} />
      ) : (
        <LooseText timeStep={timeStep} />
      )}
      <RestartButton />
    </div>
  );
};

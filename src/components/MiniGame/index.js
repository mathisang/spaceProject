import React, { useContext, useState } from "react";
import stepCards from "../../datas/stepCards.json";
import GaugeContext from "../Gauge/GaugeContext";
import gameList from "../../datas/gameList.json";
import "./MiniGame.scss";

export default function ({
  setStep,
  step,
  setEnd,
  setGameOn,
  year,
  gameBadge,
}) {
  const numberEvent = step.id + 1;
  // Message de réussite ou défaite de l'événement
  const Text = () => {
    return (
      <div className="gameInfos">
        <span className="stat">
          {year} - {numberEvent}
          {numberEvent === 1 ? "er" : "ème"} événement
        </span>
        <h3 className="titleGame">{gameList[step.id].title}</h3>
        <p className="description">{gameList[step.id].information}</p>
      </div>
    );
  };

  const RulesGame = () => {
    return (
      <div className="gameRules">
        <div className="showGame" />
        <p className="description">{gameList[step.id].rules}</p>
      </div>
    );
  };

  const { gauge, setGauge } = useContext(GaugeContext);
  const [gameStatus, setGameStatus] = useState(false);

  const GameButton = ({ result }) => {
    const handleClick = (result) => {
      setGauge({
        money: gauge.money + stepCards[step.id][result].money,
        opinion: gauge.opinion + stepCards[step.id][result].opinion,
        search: gauge.search + stepCards[step.id][result].search,
      });
      setGameStatus(result);
    };
    return (
      <button
        onClick={() => {
          handleClick(result);
        }}
        className="small"
      >
        Je suis prêt
      </button>
    );
  };

  const EndGame = () => {
    const skipGame = () => {
      gameBadge[step.id] = gameStatus === "win" ? "usa" : "urss";
      setGameOn(false);
      setStep({ isActive: false, id: step.id + 1 });
    };
    return (
      <div className="resultGame">
        <div>
          <img
            src={`../../assets/images/step_event/flag_${
              gameStatus === "win" ? "usa.png" : "urss.png"
            }`}
            alt=""
          />
        </div>
        <h3 className="titleGame">{stepCards[step.id][gameStatus].label}</h3>
        <p className="description">{stepCards[step.id][gameStatus].message}</p>

        <img
          className="pictureResult"
          src={`../../assets/images/step_event/${
            stepCards[step.id][gameStatus].picture
          }`}
          alt=""
        />
        <button onClick={skipGame} className="small">
          Continuer
        </button>
      </div>
    );
  };

  // Affichage de l'événement
  return (
    <div className="miniGame">
      {gameStatus === false && (
        <div>
          <Text />
          <RulesGame />
          <GameButton result="win" />
          {/*<GameButton result="loose" />*/}
        </div>
      )}
      {gameStatus !== false && (
        <EndGame step={step} setStep={setStep} setEnd={setEnd} />
      )}
    </div>
  );
}

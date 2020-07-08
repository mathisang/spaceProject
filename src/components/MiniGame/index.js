import React, { useContext, useEffect, useState } from "react";
import GaugeContext from "../Gauge/GaugeContext";
import "./MiniGame.scss";
import FirstGame from "../Three/MiniGame";
import MoonGame from "../Three/MoonGame";

export default function ({
  setStep,
  step,
  setEnd,
  setGameOn,
  year,
  gameBadge,
  setGameBadge,
  gameData,
  stepCards,
  lifePoints,
  setLifePoints,
}) {
  const numberEvent = step.id + 1;
  const [resultGame, setResultGame] = useState(null);
  // Message de réussite ou défaite de l'événement
  const Text = () => {
    return (
      <div className="gameInfos">
        <span className="stat">
          {year} - {numberEvent}
          {numberEvent === 1 ? "er" : "ème"} événement
        </span>
        <h3 className="titleGame">{gameData[step.id].title}</h3>
        <p className="description">{gameData[step.id].information}</p>
      </div>
    );
  };

  const urlVideo =
    step.id === 0
      ? "../../assets/images/cards/rocketgame.mp4"
      : "../../assets/images/cards/moongame.mp4";

  const RulesGame = () => {
    return (
      <div className="gameRules">
        <div className="videoTuto">
          <video video autobuffer autoPlay loop>
            <source id="mp4" src={urlVideo} type="video/mp4" />
          </video>
        </div>
        <p className="description">{gameData[step.id].rules}</p>
      </div>
    );
  };

  const { gauge, setGauge } = useContext(GaugeContext);
  const [gameStatus, setGameStatus] = useState(false);

  const GameButton = () => {
    const handleClick = () => {
      setGameStatus(true);
    };
    return (
      <button
        onClick={() => {
          handleClick();
        }}
        className="small"
      >
        Je suis prêt
      </button>
    );
  };

  const EndGame = () => {
    setResultGame(nameGame === "usa" ? "Win" : "Loose");
    const skipGame = () => {
      setGauge({
        money: gauge.money + stepCards[step.id]["money" + resultGame],
        opinion: gauge.opinion + stepCards[step.id]["opinion" + resultGame],
        search: gauge.search + stepCards[step.id]["search" + resultGame],
      });
      setGameOn(false);
      setStep({ isActive: false, id: step.id + 1 });
    };
    console.log(resultGame);
    return (
      <div className="resultGame">
        <div>
          <img
            src={`../../assets/images/step_event/flag_${nameGame}.png`}
            alt=""
          />
        </div>
        <h3 className="titleGame">
          {stepCards[step.id]["label" + resultGame]}
        </h3>
        <p className="description">
          {stepCards[step.id]["message" + resultGame]}
        </p>

        <div
          className="pictureResult"
          style={{
            background: `url('../../assets/images/step_event/${
              stepCards[step.id]["picture" + resultGame]
            }') center no-repeat`,
            backgroundSize: "cover",
          }}
        />
        <button onClick={skipGame} className="small">
          Continuer
        </button>
      </div>
    );
  };

  const nameGame =
    step.id === 0 ? gameBadge.flightGame : step.id === 1 && gameBadge.moonGame;
  const loadGame =
    step.id === 0 ? (
      <FirstGame
        setGameBadge={setGameBadge}
        gameBadge={gameBadge}
        setResultGame={setResultGame}
        lifePoints={lifePoints}
        setLifePoints={setLifePoints}
      />
    ) : (
      step.id === 1 && (
        <MoonGame
          setGameBadge={setGameBadge}
          gameBadge={gameBadge}
          setResultGame={setResultGame}
          lifePoints={lifePoints}
          setLifePoints={setLifePoints}
        />
      )
    );

  // Affichage de l'événement
  return (
    <div
      className="miniGame"
      style={{
        width: gameStatus !== false && nameGame === false && "100%",
        maxWidth: gameStatus !== false && nameGame === false && "100%",
        padding: gameStatus !== false && nameGame === false && "unset",
      }}
    >
      {gameStatus === false && (
        <div>
          <Text />
          <RulesGame />
          <GameButton />
        </div>
      )}
      {gameStatus !== false &&
        (nameGame === false ? (
          loadGame
        ) : (
          <EndGame step={step} setStep={setStep} setEnd={setEnd} />
        ))}
    </div>
  );
}

import React, { useContext, useState } from "react";
import stepCards from "../../datas/stepCards.json";
import GaugeContext from "../Gauge/GaugeContext";
import gameList from "../../datas/gameList.json";
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
    setResultGame(nameGame === "usa" ? "win" : "loose");
    const skipGame = () => {
      setGauge({
        money: gauge.money + stepCards[step.id][resultGame].money,
        opinion: gauge.opinion + stepCards[step.id][resultGame].opinion,
        search: gauge.search + stepCards[step.id][resultGame].search,
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
        <h3 className="titleGame">{stepCards[step.id][resultGame].label}</h3>
        <p className="description">{stepCards[step.id][resultGame].message}</p>

        <div
          className="pictureResult"
          style={{
            background: `url('../../assets/images/step_event/${
              stepCards[step.id][resultGame].picture
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
  console.log(gameBadge.flightGame);

  const nameGame =
    step.id === 0 ? gameBadge.flightGame : step.id === 1 && gameBadge.moonGame;
  const loadGame =
    step.id === 0 ? (
      <FirstGame
        setGameBadge={setGameBadge}
        gameBadge={gameBadge}
        setResultGame={setResultGame}
      />
    ) : (
      step.id === 1 && (
        <MoonGame
          setGameBadge={setGameBadge}
          gameBadge={gameBadge}
          setResultGame={setResultGame}
        />
      )
    );

  // Affichage de l'événement
  return (
    <div
      className="miniGame"
      style={{
        width: gameStatus !== false && nameGame === false && "100vw",
        maxWidth: gameStatus !== false && nameGame === false && "100vw",
        padding: gameStatus !== false && nameGame === false && "unset",
      }}
    >
      {gameStatus === false && (
        <div>
          <Text />
          <RulesGame />
          <GameButton />
          {/*<GameButton result="loose" />*/}
        </div>
      )}
      {gameStatus !== false &&
        // <EndGame step={step} setStep={setStep} setEnd={setEnd} />
        (nameGame === false ? (
          loadGame
        ) : (
          <EndGame step={step} setStep={setStep} setEnd={setEnd} />
        ))}
    </div>
  );
}

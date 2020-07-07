import React, { useState, useMemo } from "react";
import "./MoonGame.scss";
import Instructions from "./Instructions";
import Buttons from "./Buttons";
import MoonGameContext from "./Context";
import ThreeScene from "./Scene";
import {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
} from "../../../assets/images/index";
import StartCounter from "../MiniGame/StartCounter";
import LifePoints from "../MiniGame/LifePoints";

export default ({ setGameBadge, setResultGame }) => {
  const [
    { numberInstructions, btnClicked, buttons, progress },
    setMoon,
  ] = useState({
    numberInstructions: 0,
    btnClicked: 0,
    buttons: [
      { img: icon1 },
      { img: icon2 },
      { img: icon3 },
      { img: icon4 },
      { img: icon5 },
      { img: icon6 },
      { img: icon7 },
      { img: icon8 },
    ],
    progress: 0,
  });
  const moonContextValue = {
    numberInstructions,
    btnClicked,
    buttons,
    progress,
    setMoon,
  };
  const [isGameOn, setGameStatus] = useState(false);
  const [isTimerOn, setTimer] = useState(true);
  const [currentInstructions, setCurrentInstructions] = useState([0]);
  const [lifePoints, setLifePoints] = useState(3);
  const [partResult, setPartResult] = useState({ win: false, fail: false });
  let moonDifficulty = [
    { time: 5000, maxInst: 2 },
    { time: 4000, maxInst: 3 },
    { time: 3000, maxInst: 3 },
  ];

  useMemo(() => {
    /*if (progress >= 10) {
      setGameBadge((prevState) => {
        return {
          ...prevState,
          moonGame: "usa",
        };
      });
      setResultGame("win");
    }
    if (lifePoints === 0) {
      setGameBadge((prevState) => {
        return {
          ...prevState,
          moonGame: "urss",
        };
      });
      setResultGame("loose");
    }*/
  }, [numberInstructions]);
  return (
    <MoonGameContext.Provider value={moonContextValue}>
      <div className="moongame-container">
        {isGameOn ? (
          <div className="ingame">
            <ThreeScene />
            <LifePoints lifePoints={lifePoints} />
            <Instructions
              crInstr={currentInstructions}
              setCrInst={setCurrentInstructions}
              difficulty={moonDifficulty[2]}
              setTimer={setTimer}
              partResult={partResult}
            />
            <Buttons
              setPartResult={setPartResult}
              crInstr={currentInstructions}
              isTimerOn={isTimerOn}
              pts={lifePoints}
              setPts={setLifePoints}
            />
          </div>
        ) : (
          <StartCounter setGameStatus={setGameStatus} />
        )}
      </div>
    </MoonGameContext.Provider>
  );
};

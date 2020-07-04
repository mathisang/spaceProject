import React, { useState, useMemo } from "react";
import "./MoonGame.scss";
import Instructions from "./Instructions";
import Buttons from "./Buttons";
import MoonGameContext from "./Context";
import ProgressRocket from "./ProgressRocket";
import {
  icon1,
  icon2,
  icon3,
  icon4,
  icon5,
  icon6,
  icon7,
  icon8,
  heart,
} from "../../../assets/images/index";

export default () => {
  const [
    { numberInstructions, btnClicked, buttons, progress },
    setMoon,
  ] = useState({
    numberInstructions: 0,
    btnClicked: 0,
    buttons: [
      { name: "cheh", img: icon1 },
      { name: "bem", img: icon2 },
      { name: "hey", img: icon3 },
      { name: "hey", img: icon4 },
      { name: "hey", img: icon5 },
      { name: "hey", img: icon6 },
      { name: "hey", img: icon7 },
      { name: "hey", img: icon8 },
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
  const [isMoonGameOn, setMoonGame] = useState(false);
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
    if (progress >= 10) {
      alert("win");
      window.location.reload(false);
    }
    if (lifePoints === 0) {
      alert("loose");
      window.location.reload(false);
    }
  }, [numberInstructions]);
  return (
    <MoonGameContext.Provider value={moonContextValue}>
      <div>
        {isMoonGameOn ? (
          <div>
            <ProgressRocket />
            <div className="health-container">
              <p>{lifePoints} x </p>
              <img src={heart} />
            </div>
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
          <div>
            <button onClick={() => setMoonGame(true)}>Commencer le jeu</button>
          </div>
        )}
      </div>
    </MoonGameContext.Provider>
  );
};

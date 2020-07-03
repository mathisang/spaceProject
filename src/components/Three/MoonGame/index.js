import React, { useState, useMemo } from "react";
import "./MoonGame.scss";
import Instructions from "./Instructions";
import Buttons from "./Buttons";
import MoonGameContext from "./Context";
import ProgressRocket from "./ProgressRocket";

export default () => {
  const [
    { numberInstructions, btnClicked, buttons, progress },
    setMoon,
  ] = useState({
    numberInstructions: 0,
    btnClicked: 0,
    buttons: [{ name: "cheh" }, { name: "bem" }, { name: "hey" }],
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
  let moonDifficulty = [
    { time: 5000, maxInst: 2 },
    { time: 4000, maxInst: 3 },
    { time: 3000, maxInst: 5 },
  ];

  useMemo(() => {
    if (progress >= 10) {
      alert("win");
      window.location.reload(false);
    }
    if (numberInstructions > 20) {
      alert("loose");
      window.location.reload(false);
    }
  }, [progress]);
  return (
    <MoonGameContext.Provider value={moonContextValue}>
      <div>
        {isMoonGameOn ? (
          <div>
            <ProgressRocket />
            <Instructions
              crInstr={currentInstructions}
              setCrInst={setCurrentInstructions}
              difficulty={moonDifficulty[2]}
              setTimer={setTimer}
            />
            <Buttons
              crInstr={currentInstructions}
              setCrInst={setCurrentInstructions}
              isTimerOn={isTimerOn}
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

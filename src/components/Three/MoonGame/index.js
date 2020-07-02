import React, { useState, useMemo } from "react";
import "./MoonGame.scss";
import Instructions from "./Instructions";
import Buttons from "./Buttons";
import MoonGameContext from "./Context";
import ProgressRocket from "./ProgressRocket";

export default () => {
  const [
    { numberInstructions, currentInstructions, btnClicked, buttons, progress },
    setMoon,
  ] = useState({
    numberInstructions: 0,
    currentInstructions: 0,
    btnClicked: 0,
    buttons: [{ name: "cheh" }, { name: "bem" }, { name: "hey" }],
    progress: 0,
  });
  const moonContextValue = {
    numberInstructions,
    currentInstructions,
    btnClicked,
    buttons,
    progress,
    setMoon,
  };
  const [isMoonGameOn, setMoonGame] = useState(false);
  const [isTimerOn, setTimer] = useState(false);
  return (
    <MoonGameContext.Provider value={moonContextValue}>
      <div>
        {isMoonGameOn ? (
          <div>
            <ProgressRocket />
            <Instructions setTimer={setTimer} isTimerOn={isTimerOn} />
            <Buttons setTimer={setTimer} isTimerOn={isTimerOn} />
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

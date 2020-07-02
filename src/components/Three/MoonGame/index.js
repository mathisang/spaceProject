import React, { useState, useMemo } from "react";
import "./MoonGame.scss";
import Instructions from "./Instructions";
import Buttons from "./Buttons";
import MoonGameContext from "./Context";

export default () => {
  const [
    { numberInstructions, currentInstructions, btnClicked, buttons },
    setMoon,
  ] = useState({
    numberInstructions: 0,
    currentInstructions: 0,
    btnClicked: null,
    buttons: [{ name: "cheh" }, { name: "bem" }, { name: "hey" }],
  });
  const moonContextValue = {
    numberInstructions,
    currentInstructions,
    btnClicked,
    buttons,
    setMoon,
  };
  const [isMoonGameOn, setMoonGame] = useState(false);
  return (
    <MoonGameContext.Provider value={moonContextValue}>
      <div>
        {isMoonGameOn ? (
          <div>
            <Instructions />
            <Buttons />
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

import React, { useState, useMemo } from "react";
import "./MoonGame.scss";
import Instructions from "./Instructions";
import Buttons from "./Buttons";

export default () => {
  let buttons = [{ name: "cheh" }, { name: "bem" }, { name: "hey" }];
  const [isMoonGameOn, setMoonGame] = useState(false);

  return (
    <div>
      {isMoonGameOn ? (
        <div>
          <Instructions buttons={buttons} />
          <Buttons buttons={buttons} />
        </div>
      ) : (
        <div>
          <button onClick={() => setMoonGame(true)}>Commencer le jeu</button>
        </div>
      )}
    </div>
  );
};

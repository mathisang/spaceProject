import React, { useEffect, useContext, useRef, useState } from "react";
import MoonGameContext from "../Context";
import cards from "../../../../datas/randomCards.json";

export default ({ setTimer, difficulty, crInstr, setCrInst }) => {
  const { numberInstructions, buttons, setMoon } = useContext(MoonGameContext);
  function pickInstruction() {
    //remet les instructions à vide
    setCrInst((crInstr = []));
    // génère un chiffre aléatoire entre 1 et le nombre max d'instructions de difficulty props
    const currentInstrLenght =
      Math.floor(Math.random() * difficulty.maxInst) + 1;
    // Créer un tableau qui va contenir autant d'instructions que currentInstrLenght et met currentInstructions à jour
    for (let i = 0; i < currentInstrLenght; i++) {
      const newInstruction = Math.floor(Math.random() * buttons.length);
      setCrInst(crInstr.push(newInstruction));
    }
    console.log("instructions", crInstr);
  }
  const timer = useRef(false);

  function handleTimer() {
    clearTimeout(timer.current);
    setTimer(true);
    timer.current = setTimeout(() => {
      setTimer(false);
    }, 5000);
  }
  useEffect(() => {
    /*pickInstruction();*/
    handleTimer();
  }, [numberInstructions]);
  return (
    <div className="instruction">
      <button onClick={() => pickInstruction()}>pick</button>
      {/*{currentInstructions !== null && <p>les instructions sont </p>}*/}
    </div>
  );
};

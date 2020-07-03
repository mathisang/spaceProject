import React, { useEffect, useContext, useRef } from "react";
import MoonGameContext from "../Context";

export default ({ setTimer, difficulty, crInstr, setCrInst }) => {
  const { numberInstructions, buttons } = useContext(MoonGameContext);
  function pickInstruction() {
    //remet les instructions à vide
    let array = [];
    // génère un chiffre aléatoire entre 1 et le nombre max d'instructions de difficulty props
    const currentInstrLenght =
      Math.floor(Math.random() * difficulty.maxInst) + 1;
    // Créer un tableau qui va contenir autant d'instructions que currentInstrLenght
    for (let i = 0; i < currentInstrLenght; i++) {
      const newInstruction = Math.floor(Math.random() * buttons.length);
      array.push(newInstruction);
    }
    // Assigne la valeur du tableau à notre state d'instructions
    setCrInst((crInstr = array));
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
    console.log("partie", numberInstructions);
    pickInstruction();
    handleTimer();
  }, [numberInstructions]);
  return (
    <div className="instruction">
      <button onClick={() => pickInstruction()}>pick</button>
      {crInstr.length > 0 && (
        <div>
          <p>Consignes :</p>
          {crInstr.map((instruction, index) => (
            <p key={index}>{buttons[crInstr[index]].name}</p>
          ))}
        </div>
      )}
    </div>
  );
};

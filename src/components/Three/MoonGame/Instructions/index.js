import React, { useEffect, useContext, useRef, useState, useMemo } from "react";
import MoonGameContext from "../Context";
import TimeBar from "../TimeBar";
import { success, fail } from "../../../../assets/images/index";

export default ({ setTimer, difficulty, crInstr, setCrInst, partResult }) => {
  const { numberInstructions, buttons } = useContext(MoonGameContext);
  let tic = 50;
  const [ticState, setTicState] = useState(50);
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
    clearInterval(timer.current);
    setTimer(true);
    tic = 50;
    setTicState(tic);
    timer.current = setInterval(() => {
      if (tic > 0) {
        tic--;
        setTicState(tic);
      } else {
        clearInterval(timer.current);
        setTimer(false);
      }
    }, 100);
  }
  useEffect(() => {
    console.log("partie", numberInstructions);
    pickInstruction();
    handleTimer();
  }, [numberInstructions]);
  useMemo(() => {
    (partResult.win || partResult.fail) && clearInterval(timer.current);
  }, [partResult]);
  return (
    <div className="instructions-container">
      <TimeBar ticState={ticState} />
      <div className="instructions">
        {crInstr.length > 0 && (
          <div>
            {!partResult.win &&
              !partResult.fail &&
              crInstr.map((instruction, index) => (
                <div
                  id={`instruction-${index}`}
                  className="secondary-button instruction"
                  key={index}
                >
                  <img src={buttons[crInstr[index]].img} />
                </div>
              ))}
            {partResult.win && <img src={success} />}
            {partResult.fail && <img src={fail} />}
          </div>
        )}
      </div>
    </div>
  );
};

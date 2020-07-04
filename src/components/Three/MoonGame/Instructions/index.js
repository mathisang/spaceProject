import React, { useEffect, useContext, useRef, useState } from "react";
import MoonGameContext from "../Context";
import TimeBar from "../TimeBar";

export default ({ setTimer, difficulty, crInstr, setCrInst }) => {
  const { numberInstructions, buttons } = useContext(MoonGameContext);
  let tic = 0;
  const [ticState, setTicState] = useState(0);
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
    tic = 0;
    setTicState(tic);
    timer.current = setInterval(() => {
      if (tic < 50) {
        tic++;
        setTicState(tic);
        console.log(tic);
      } else {
        clearInterval(timer.current);
        setTimer(false);
      }
    }, 100);
  }
  useEffect(() => {
    console.log("state", ticState);
  }, [ticState]);
  useEffect(() => {
    console.log("partie", numberInstructions);
    pickInstruction();
    handleTimer();
  }, [numberInstructions]);
  return (
    <div>
      <TimeBar />
      <div className="instructions">
        {crInstr.length > 0 && (
          <div>
            <p>Consignes :</p>
            {crInstr.map((instruction, index) => (
              <div className="secondary-button" key={index}>
                <img src={buttons[crInstr[index]].img} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

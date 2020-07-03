import React, { useEffect, useContext, useRef } from "react";
import MoonGameContext from "../Context";

export default ({ setTimer }) => {
  const {
    numberInstructions,
    currentInstructions,
    buttons,
    setMoon,
  } = useContext(MoonGameContext);
  function pickInstruction() {
    const newInstruction = Math.floor(Math.random() * buttons.length);
    setMoon((prevState) => {
      return { ...prevState, currentInstructions: newInstruction };
    });
    console.log("instruction !", currentInstructions);
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
    pickInstruction();
    handleTimer();
  }, [numberInstructions]);
  return (
    <div className="instruction">
      {currentInstructions !== null && (
        <p>les instructions sont {buttons[currentInstructions].name}</p>
      )}
    </div>
  );
};

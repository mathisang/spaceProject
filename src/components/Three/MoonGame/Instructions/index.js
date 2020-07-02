import React, { useState, useMemo, useContext } from "react";
import MoonGameContext from "../Context";

export default () => {
  const {
    numberInstructions,
    currentInstructions,
    buttons,
    setMoon,
  } = useContext(MoonGameContext);
  useMemo(() => {
    pickInstruction();
  }, [numberInstructions]);
  function pickInstruction() {
    const newInstruction = Math.floor(Math.random() * buttons.length);
    setMoon((prevState) => {
      return { ...prevState, currentInstructions: newInstruction };
    });
    console.log("instruction !", currentInstructions);
  }
  return (
    <div className="instruction">
      {currentInstructions !== null && (
        <p>les instructions sont {buttons[currentInstructions].name}</p>
      )}
    </div>
  );
};

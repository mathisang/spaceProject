import React, { useState, useMemo } from "react";

export default ({ buttons, nmbInst }) => {
  const [currentInstructions, setCurrentInstructions] = useState(0);
  useMemo(() => {
    pickInstruction();
  }, [nmbInst]);
  function pickInstruction() {
    const newInstruction = Math.floor(Math.random() * buttons.length);
    setCurrentInstructions([newInstruction]);
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

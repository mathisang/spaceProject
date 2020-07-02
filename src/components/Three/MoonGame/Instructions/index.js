import React, { useState } from "react";

export default ({ buttons }) => {
  const [currentInstructions, setCurrentInstructions] = useState(0);
  const pickInstruction = () => {
    const newInstruction = Math.floor(Math.random() * buttons.length);
    setCurrentInstructions([newInstruction]);
    console.log(currentInstructions);
  };
  return (
    <div onClick={() => pickInstruction()} className="instruction">
      {currentInstructions !== null && (
        <p>les instructions sont {buttons[currentInstructions].name}</p>
      )}
    </div>
  );
};

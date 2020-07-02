import React, { useContext, useMemo, useState } from "react";
import MoonGameContext from "../Context";

export default () => {
  const { numberInstructions, buttons, btnClicked, setMoon } = useContext(
    MoonGameContext
  );
  useMemo(() => {
    console.log(btnClicked);
  }, [btnClicked]);

  const handleClick = (index) => {
    checkResponse(index);
    setMoon((prevState) => {
      return {
        ...prevState,
        btnClicked: index,
        numberInstructions: numberInstructions + 1,
      };
    });
  };
  function checkResponse(index) {
    console.log(index);
  }
  return (
    <div className="buttons-container">
      {buttons.map((button, index) => (
        <button onClick={() => handleClick(index)} key={index}>
          {button.name}
        </button>
      ))}
    </div>
  );
};

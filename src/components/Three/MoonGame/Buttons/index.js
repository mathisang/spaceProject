import React, { useContext, useEffect, useMemo, useState } from "react";
import MoonGameContext from "../Context";

export default ({ isTimerOn, crInstr, setCrInst }) => {
  const {
    numberInstructions,
    buttons,
    btnClicked,
    progress,
    setMoon,
  } = useContext(MoonGameContext);
  useMemo(() => {
    console.log("bouton cliqué", btnClicked);
  }, [btnClicked]);

  function defeat() {
    console.log("defeat");
    setMoon((prevState) => {
      return {
        ...prevState,
        progress: progress - 1,
        numberInstructions: numberInstructions + 1,
      };
    });
  }

  function success() {
    console.log("success");
    setMoon((prevState) => {
      return {
        ...prevState,
        progress: progress + 1,
        numberInstructions: numberInstructions + 1,
      };
    });
  }

  const handleClick = (index) => {
    handleAnswer(index);
    setMoon((prevState) => {
      return {
        ...prevState,
        btnClicked: index,
      };
    });
  };
  useEffect(() => {
    !isTimerOn && defeat();
  }, [isTimerOn]);

  function handleAnswer(index) {
    if (isTimerOn) {
      console.log("valeur à atteindre", crInstr[0]);
      console.log("lenght", crInstr.length);
      if (index === crInstr[0]) {
        if (crInstr.length === 1) {
          success();
        } else {
          let array = crInstr;
          console.log("array", array);
          array.shift();
          console.log("new array", array);
        }
      } else {
        defeat();
      }
    }
  }
  return (
    <div className="buttons-container">
      {isTimerOn ? <p>on</p> : <p>off</p>}
      {buttons.map((button, index) => (
        <button onClick={() => handleClick(index)} key={index}>
          {button.name}
        </button>
      ))}
    </div>
  );
};

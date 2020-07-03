import React, { useContext, useMemo, useState } from "react";
import MoonGameContext from "../Context";

export default ({ isTimerOn }) => {
  const {
    numberInstructions,
    buttons,
    btnClicked,
    currentInstructions,
    progress,
    setMoon,
  } = useContext(MoonGameContext);
  useMemo(() => {
    console.log(btnClicked);
  }, [btnClicked]);

  function defeat() {
    console.log("defeat");
    setMoon((prevState) => {
      return { ...prevState, progress: progress - 1 };
    });
  }

  function success() {
    console.log("success");
    setMoon((prevState) => {
      return { ...prevState, progress: progress + 1 };
    });
  }

  const handleClick = (index) => {
    handleAnswer(index);
    setMoon((prevState) => {
      return {
        ...prevState,
        btnClicked: index,
        numberInstructions: numberInstructions + 1,
      };
    });
  };
  function handleAnswer(index) {
    if (isTimerOn) {
      if (index === currentInstructions) {
        success();
      } else {
        defeat();
      }
    } else {
      defeat();
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

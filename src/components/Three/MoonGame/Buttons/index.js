import React, { useContext, useEffect, useMemo, useState } from "react";
import MoonGameContext from "../Context";

export default ({ isTimerOn, crInstr, setPts, pts }) => {
  const {
    numberInstructions,
    buttons,
    btnClicked,
    progress,
    setMoon,
  } = useContext(MoonGameContext);
  let [trackArray, setTrackArray] = useState([]);
  const [trackValue, setTrackValue] = useState(0);

  useEffect(() => {
    const elInstru = document.getElementsByClassName("instruction");
    for (let i = 0; i < trackValue; i++) {
      elInstru[i] !== undefined && elInstru[i].classList.remove("done");
    }
    setTrackValue(0);
    setTrackArray((trackArray = Array.from(crInstr)));
    console.log("celui-là", trackArray);
  }, [crInstr]);

  useEffect(() => {
    console.log("trackValue", trackValue);
  }, [trackValue]);

  function defeat() {
    console.log("defeat");
    setMoon((prevState) => {
      return {
        ...prevState,
        numberInstructions: numberInstructions + 1,
      };
    });
    setPts(pts - 1);
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
      console.log("track on click", trackArray);
      if (index === trackArray[0]) {
        if (trackArray.length === 1) {
          success();
        } else {
          trackArray.shift();
          document
            .getElementById(`instruction-${trackValue}`)
            .classList.add("done");
          setTrackValue(trackValue + 1);
          console.log("new array", trackArray);
          console.log("new crinstr", crInstr);
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
        <button
          className="secondary-button"
          onClick={() => handleClick(index)}
          key={index}
        >
          <img src={button.img} />
        </button>
      ))}
    </div>
  );
};

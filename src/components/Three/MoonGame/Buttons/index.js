import React, { useContext, useEffect, useMemo, useState } from "react";
import MoonGameContext from "../Context";
import { speaker, nut } from "../../../../assets/images/index";
import "./buttons.scss";

export default ({ isTimerOn, crInstr, setPts, pts, setPartResult }) => {
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
    setPartResult({ win: false, fail: true });
    setTimeout(() => {
      setPartResult({ win: false, fail: false });
      setMoon((prevState) => {
        return {
          ...prevState,
          numberInstructions: numberInstructions + 1,
        };
      });
      setPts(pts - 1);
    }, 1000);
  }

  function success() {
    console.log("success");
    setPartResult({ win: true, fail: false });
    setTimeout(() => {
      setPartResult({ win: false, fail: false });
      setMoon((prevState) => {
        return {
          ...prevState,
          progress: progress + 1,
          numberInstructions: numberInstructions + 1,
        };
      });
    }, 1000);
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
      if (index === trackArray[0]) {
        if (trackArray.length === 1) {
          success();
        } else {
          trackArray.shift();
          document
            .getElementById(`instruction-${trackValue}`)
            .classList.add("done");
          setTrackValue(trackValue + 1);
        }
      } else {
        defeat();
      }
    }
  }
  return (
    <div className="controls-container">
      <img className="nut" src={nut} />
      <img className="nut" src={nut} />
      <img className="nut" src={nut} />
      <img className="nut" src={nut} />
      <div>
        <div className="image-container">
          <img src={speaker} />
        </div>
        <p>Houston</p>
        <div className="buttons-container">
          {buttons.map((button, index) => (
            <button
              className={`secondary-button ${
                index === 2 || index === 4 ? "large" : ""
              }`}
              onClick={() => handleClick(index)}
              key={index}
            >
              <img src={button.img} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

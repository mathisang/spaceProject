import React, { useState, useMemo } from "react";
import "./MoonGame.scss";
import Instructions from "./Instructions";

export default () => {
  let buttons = [{ name: "cheh" }, { name: "bem" }, { name: "hey" }];
  const [buttonClicked, setButtonClicked] = useState(null);

  useMemo(() => {
    console.log(buttonClicked);
  }, [buttonClicked]);

  const handleClick = (index) => {
    setButtonClicked(index);
  };

  return (
    <div>
      <Instructions buttons={buttons} />
      <div className="buttons-container">
        {buttons.map((button, index) => (
          <button onClick={() => handleClick(index)} key={index}>
            {button.name}
          </button>
        ))}
      </div>
    </div>
  );
};

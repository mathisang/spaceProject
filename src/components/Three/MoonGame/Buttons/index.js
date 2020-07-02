import React, { useMemo, useState } from "react";

export default ({ buttons }) => {
  const [buttonClicked, setButtonClicked] = useState(null);
  useMemo(() => {
    console.log(buttonClicked);
  }, [buttonClicked]);

  const handleClick = (index) => {
    setButtonClicked(index);
  };
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

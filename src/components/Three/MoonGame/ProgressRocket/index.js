import React, { useContext } from "react";
import MoonGameContext from "../Context";

export default () => {
  const { progress, setMoon } = useContext(MoonGameContext);

  return (
    <div className="progress">
      <div>Progress : {progress}</div>
      <button
        onClick={() =>
          setMoon((prevState) => {
            return {
              ...prevState,
              progress: progress + 1,
            };
          })
        }
      >
        pro
      </button>
    </div>
  );
};

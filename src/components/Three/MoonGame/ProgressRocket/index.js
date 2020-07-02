import React, { useContext } from "react";
import MoonGameContext from "../Context";

export default () => {
  const { progress, setMoon } = useContext(MoonGameContext);

  return <div className="progress">Progress : {progress}</div>;
};

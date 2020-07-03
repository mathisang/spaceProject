import React from "react";

const MoonGameContext = React.createContext({
  numberInstructions: 0,
  btnClicked: null,
  buttons: [{ name: "cheh" }, { name: "bem" }, { name: "hey" }],
  progress: 0,

  setMoon: () => {},
});

export default MoonGameContext;

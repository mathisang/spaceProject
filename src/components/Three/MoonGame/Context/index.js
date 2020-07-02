import React from "react";

const MoonGameContext = React.createContext({
  numberInstructions: 0,
  currentInstructions: 0,
  btnClicked: null,
  buttons: [{ name: "cheh" }, { name: "bem" }, { name: "hey" }],

  setMoon: () => {},
});

export default MoonGameContext;

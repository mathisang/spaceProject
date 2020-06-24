import React from "react";

// set the defaults
const GaugeContext = React.createContext({
  gauge: {
    money: 50,
    opinion: 50,
    search: 50,
  },
  setGauge: () => {},
});

export default GaugeContext;

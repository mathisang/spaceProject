import React from "react";

// Valeur par défaut des jauges
const GaugeContext = React.createContext({
  gauge: {
    money: 30,
    opinion: 50,
    search: 50,
  },
  setGauge: () => {},
});

export default GaugeContext;

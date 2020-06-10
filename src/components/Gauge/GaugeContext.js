import React from "react";

// set the defaults
const GaugeContext = React.createContext({
    gauge: {
        argent: 50,
        opinion: 50,
        recherche: 50

    },
    setGauge: () => {}
});

export default GaugeContext;
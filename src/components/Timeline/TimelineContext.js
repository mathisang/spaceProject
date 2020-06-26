import React from "react";

// Valeur par défaut USA & URSS
const TimelineContext = React.createContext({
  timeline: {
    urss: 5,
    usa: 0,
  },
  setTimeline: () => {},
});

export default TimelineContext;

import React from "react";

// set the defaults
const TimelineContext = React.createContext({
  timeline: {
    urss: 5,
    usa: 0,
  },
  setTimeline: () => {},
});

export default TimelineContext;

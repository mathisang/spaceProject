import React, { useState, useContext, useEffect } from "react";
import TimelineContext from "./TimelineContext";

export default function () {
  const { timeline, setTimeline } = useContext(TimelineContext);

  return (
    <div className="">
      <div>
        URSS : {timeline.urss} %
        <br />
        USA : {timeline.usa} %
      </div>
    </div>
  );
}

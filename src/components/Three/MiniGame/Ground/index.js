import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { useDrag, useGesture } from "react-use-gesture";

export default ({ propsDrag, setDrag }) => {
  const bind = useDrag(({ down, movement: [x, y] }) => {
    setDrag({
      x: x,
      y: y,
      scale: down ? 1.2 : 1,
      immediate: down,
    });
  });
  /*useEffect(() => {
    console.log("value", propsDrag.x.value);
  });*/
  /*const bindDrag = useDrag(onDrag);
   */
  return (
    <animated.div className="drag-container">
      <animated.div
        {...bind()}
        style={propsDrag}
        className="drag-control"
      ></animated.div>
    </animated.div>
  );
};

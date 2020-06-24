import React from "react";
import { usePlane } from "use-cannon";

const Ground = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -5, 0],
    ...props,
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  );
};

export default () => <Ground />;

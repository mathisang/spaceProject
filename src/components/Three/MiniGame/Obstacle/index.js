import React from "react";
import { useSphere } from "use-cannon";

export default function Obstacle({ props, number }) {
  const [ref] = useSphere(() => ({
    mass: 1,
    /*position: [0, 5, 0],*/
    position: [Math.random() * 10, Math.random() * 6, 0],
    ...props,
  }));
  return (
    <instancedMesh
      ref={ref}
      receiveShadow
      castShadow
      args={[null, null, number]}
    >
      <sphereBufferGeometry attach="geometry" args={[0.5]} />
      <meshLambertMaterial attach="material" color="grey" />
    </instancedMesh>
  );
}

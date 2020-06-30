import React from "react";

export default function Loading() {
  return (
    <mesh visible position={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

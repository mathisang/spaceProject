import { useThree } from "react-three-fiber";
import React from "react";

export default function ColorBackground({ color }) {
  const { viewport } = useThree();
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" color={color} depthTest={false} />
    </mesh>
  );
}

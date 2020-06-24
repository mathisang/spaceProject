import React, { useEffect, useState } from "react";
import { useBox } from "use-cannon";
import { Box } from "drei";
import { useFrame } from "react-three-fiber";
import { useDrag } from "react-use-gesture";
import { useSpring, a } from "react-spring/three";

export default function Rocket({ propsCannon, setTouched, isTouched }) {
  const [ref, api] = useBox(() => ({
    args: [1, 3, 1],
    onCollide: () => setTouched(true),
    ...propsCannon,
  }));
  const propsSpring = useSpring({
    color: isTouched ? "red" : "grey",
  });

  useFrame((state) => {
    api.position.set((state.mouse.x * state.viewport.width) / 2, -4, 0);
  });
  return (
    <a.mesh onPointerOver={() => setTouched(true)}>
      <Box ref={ref} args={[1, 3, 1]}>
        <a.meshPhysicalMaterial attach="material" color={propsSpring.color} />
      </Box>
    </a.mesh>
  );
}

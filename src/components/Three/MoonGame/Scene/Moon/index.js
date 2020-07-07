import React from "react";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

export default function Moon() {
  const map = useLoader(THREE.TextureLoader, "three/moongame/moon/moon.jpg");

  return (
    <mesh position={[0, -16, 0]} scale={[30, 30, 1]} receiveShadow castShadow>
      <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
      <meshStandardMaterial attach="material" map={map} />
    </mesh>
  );
}

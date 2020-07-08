import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
export default function Moon() {
  const map = useLoader(THREE.TextureLoader, "three/moongame/moon/moon.jpg");
  const moon = useRef();
  useFrame(() => {
    moon.current.rotation.y += 0.0005;
  });
  return (
    <mesh
      ref={moon}
      position={[0, -40, 0]}
      scale={[1, 1, 1]}
      receiveShadow
      castShadow
    >
      <sphereBufferGeometry attach="geometry" args={[50, 64, 64]} />
      <meshStandardMaterial attach="material" map={map} />
    </mesh>
  );
}

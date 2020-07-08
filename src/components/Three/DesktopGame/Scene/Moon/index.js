import React, { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
export default function Moon() {
  const moon = useRef();
  const map = useLoader(THREE.TextureLoader, "three/moongame/moon/moon.jpg");
  useFrame(() => {
    moon.current.rotation.y -= 0.001;
    moon.current.rotation.x -= 0.001;
  });
  return (
    <mesh
      ref={moon}
      position={[0, 0, -1.8]}
      scale={[1, 1, 1]}
      receiveShadow
      castShadow
    >
      <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
      <meshStandardMaterial attach="material" map={map} />
    </mesh>
  );
}

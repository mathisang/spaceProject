import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
export default function Earth() {
  const earthRef = useRef();
  const map = useLoader(THREE.TextureLoader, "three/earth/earth.jpg");
  useFrame(() => {
    earthRef.current.rotation.y -= 0.001;
  });
  return (
    <mesh
      ref={earthRef}
      position={[18, 5, -18]}
      scale={[1, 1, 1]}
      receiveShadow
      castShadow
    >
      <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
      <meshStandardMaterial attach="material" map={map} />
    </mesh>
  );
}

import React from "react";
import { a, useSpring } from "react-spring/three";
import { useLoader, useThree } from "react-three-fiber";
import * as THREE from "three";

/*const Moon = () => {
  const { viewport } = useThree();
  const props = useSpring({
    color: "red",
  });
  return (
    <a.mesh
      rotation={[-0.1, 0, 0]}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};*/

export default function Moon() {
  const map = useLoader(
    THREE.TextureLoader,
    "three/miniGameSpaceship/obstacle/obstacle_texture.jpg"
  );

  return (
    <mesh position={[0, -15, 0]} scale={[25, 25, 1]} receiveShadow>
      <sphereBufferGeometry attach="geometry" args={[1, 64, 64]} />
      <meshStandardMaterial attach="material" map={map} />
    </mesh>
  );
}

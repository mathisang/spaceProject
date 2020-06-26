import React, { useEffect, useState, useRef } from "react";
import { useBox } from "use-cannon";
import { Box } from "drei";
import { useFrame, useLoader } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Rocket({ propsCannon, setTouched, isTouched }) {
  const [ref, api] = useBox(() => ({
    args: [1, 3, 1],
    onCollide: () => setTouched(true),
    ...propsCannon,
  }));
  const propsSpring = useSpring({
    color: isTouched ? "red" : "grey",
  });
  const { nodes } = useLoader(
    GLTFLoader,
    "three/miniGameSpaceship/spaceShip.glb"
  );
  const groupModel = useRef();
  const scene = useLoader(GLTFLoader, "three/miniGameSpaceship/spaceShip.glb");
  useEffect(() => {
    console.log(scene);
  }, []);

  useFrame((state) => {
    api.position.set((state.mouse.x * state.viewport.width) / 2, -4, 0);
  });
  return (
    <a.mesh ref={ref}>
      <group ref={groupModel}>
        <mesh visible geometry={nodes.Cylinder001_0.geometry}>
          <a.meshPhysicalMaterial attach="material" color={propsSpring.color} />
        </mesh>
        <mesh visible geometry={nodes.Cylinder001_1.geometry}>
          <meshStandardMaterial
            attach="material"
            color="white"
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh visible geometry={nodes.Cylinder001_2.geometry}>
          <meshStandardMaterial
            attach="material"
            color="white"
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh visible geometry={nodes.Cylinder001_3.geometry}>
          <meshStandardMaterial
            attach="material"
            color="white"
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh visible geometry={nodes.Cylinder001_4.geometry}>
          <meshStandardMaterial
            attach="material"
            color="white"
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
      </group>
      {/*<Box ref={ref} args={[1, 3, 1]}>
        <a.meshPhysicalMaterial attach="material" color={propsSpring.color} />
      </Box>*/}
    </a.mesh>
  );
}

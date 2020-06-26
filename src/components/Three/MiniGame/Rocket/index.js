import React, { useEffect, useState, useRef } from "react";
import { useBox } from "use-cannon";
import { Box } from "drei";
import { useFrame, useLoader } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Rocket({ propsCannon, setTouched, isTouched }) {
  // use cannon box declaration
  const [ref, api] = useBox(() => ({
    args: [1, 0, 1],
    onCollide: () => setTouched(true),
    ...propsCannon,
  }));
  // gltf model load
  const { nodes } = useLoader(
    GLTFLoader,
    "three/miniGameSpaceship/rocket/spaceShip.glb"
  );
  const groupModel = useRef();
  const scene = useLoader(
    GLTFLoader,
    "three/miniGameSpaceship/rocket/spaceShip.glb"
  );
  useEffect(() => {
    console.log(scene);
  }, []);

  useFrame((state) => {
    api.position.set((state.mouse.x * state.viewport.width) / 2, -2, 0);
  });

  return (
    <mesh ref={ref}>
      <group ref={groupModel} scale={[0.2, 0.2, 0.2]}>
        <mesh visible geometry={nodes.Cylinder001_0.geometry}>
          <meshPhysicalMaterial
            attach="material"
            color={nodes.Cylinder001_0.material.color}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh visible geometry={nodes.Cylinder001_1.geometry}>
          <meshPhysicalMaterial
            attach="material"
            color={
              isTouched
                ? nodes.Cylinder001_3.material.color
                : nodes.Cylinder001_1.material.color
            }
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh visible geometry={nodes.Cylinder001_2.geometry}>
          <a.meshStandardMaterial
            attach="material"
            color={
              isTouched
                ? nodes.Cylinder001_3.material.color
                : nodes.Cylinder001_2.material.color
            }
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh visible geometry={nodes.Cylinder001_3.geometry}>
          <meshStandardMaterial
            attach="material"
            color={nodes.Cylinder001_3.material.color}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh visible geometry={nodes.Cylinder001_4.geometry}>
          <a.meshStandardMaterial
            attach="material"
            color={
              isTouched
                ? nodes.Cylinder001_3.material.color
                : nodes.Cylinder001_4.material.color
            }
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
      </group>
      {/*<Box ref={ref} args={[1, 3, 1]}>
        <a.meshPhysicalMaterial attach="material" color={propsSpring.color} />
      </Box>*/}
    </mesh>
  );
}

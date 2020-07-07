import React, { useEffect, useState, useRef } from "react";
import { useBox } from "use-cannon";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useDrag } from "react-use-gesture";
import { isMobile } from "react-device-detect";

export default function Rocket({ propsCannon, setTouched, isTouched }) {
  // spring drag props
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring(() => ({
    position: [0, 0, 0],
  }));
  const bind = useDrag(
    ({ movement: [x] }) =>
      set({
        position: [x / aspect, -4, 0],
      }),
    { eventOptions: { pointer: true } }
  );
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
    console.log(spring.position);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    api.rotation.set(0, t * 0.8, 0);
    if (isMobile) {
      api.position.set(spring.position.payload[0].value, -4, 0);
    } else {
      api.position.set((state.mouse.x * state.viewport.width) / 2, -4, 0);
    }
  });

  return (
    <a.mesh {...spring} {...bind()} ref={ref}>
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
    </a.mesh>
  );
}

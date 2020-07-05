import React, { useEffect, useState, useRef } from "react";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Rocket({}) {
  const [spring, set] = useSpring(() => ({
    position: [0, 0, 0],
  }));
  // gltf model load
  const { nodes } = useLoader(GLTFLoader, "three/moongame/module/module.glb");
  const groupModel = useRef();
  const scene = useLoader(GLTFLoader, "three/moongame/module/module.glb");
  useEffect(() => {
    console.log(spring.position);
    console.log(scene);
  }, []);

  useFrame((state) => {});

  return (
    <a.mesh {...spring}>
      <group ref={groupModel} scale={[1, 1, 1]}>
        <mesh geometry={nodes.Cylinder002_0.geometry}>
          <meshStandardMaterial
            attach="material"
            color={nodes.Cylinder002_0.material.color}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh geometry={nodes.Cylinder002_1.geometry}>
          <meshStandardMaterial
            attach="material"
            color={nodes.Cylinder002_1.material.color}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh geometry={nodes.Cylinder002_2.geometry}>
          <meshStandardMaterial
            attach="material"
            color={nodes.Cylinder002_2.material.color}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh geometry={nodes.Cylinder002_3.geometry}>
          <meshStandardMaterial
            attach="material"
            color={nodes.Cylinder002_3.material.color}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
        <mesh geometry={nodes.Cylinder002_4.geometry}>
          <meshStandardMaterial
            attach="material"
            color={nodes.Cylinder002_4.material.color}
            roughness={0.3}
            metalness={0.3}
          />
        </mesh>
      </group>
    </a.mesh>
  );
}

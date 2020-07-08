import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, animated } from "react-spring";

export default function Rocket({ progressProps }) {
  // gltf model load
  const { nodes } = useLoader(GLTFLoader, "three/moongame/module/module.glb");
  const groupModel = useRef();
  const scene = useLoader(GLTFLoader, "three/moongame/module/module.glb");
  const [modMove, setModMove] = useState(0);

  useFrame((state) => {
    if (modMove < progressProps) {
      setModMove(modMove + 0.05);
    }
    groupModel.current.position.y = 25 - modMove;
    if (progressProps < 9) {
      groupModel.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={groupModel} rotation={[0, 0, 0]} position={[0, 25, 8]}>
      <group scale={[0.18, 0.18, 0.18]}>
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
    </mesh>
  );
}

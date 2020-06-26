import React, { useEffect, useState } from "react";
import { useSphere } from "use-cannon";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";

export default function Obstacle({ props, number }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, -3, 0],
    ...props,
  }));
  const map = useLoader(
    THREE.TextureLoader,
    "three/miniGameSpaceship/obstacle/obstacle_texture.jpg"
  );
  const [asteroid, setAsteroid] = useState(1);
  /*const onClick = (e) => {
    console.log(e);
    setDropped(true);
  };*/
  /*useFrame((state) => {
    api.position.set(2, -4, 0);
  });*/
  /* useEffect(() => {
    /!*setTimeout(() => {
      console.log("all mesh", ref.current);
    }, 1000);*!/
    console.log(api.mass);
  }, [api.mass]);*/
  /*useFrame(() =>
  );*/
  setTimeout(() => {
    api.at(asteroid).position.set(Math.random() * 7, 7, 0);
    setAsteroid(asteroid + 1);
  }, 1000);

  return (
    <instancedMesh
      ref={ref}
      receiveShadow
      castShadow
      args={[null, null, number]}
    >
      <sphereBufferGeometry attach="geometry" args={[0.5, 32, 32]} />
      <meshStandardMaterial attach="material" map={map} />
    </instancedMesh>
  );
}

import React, { useEffect, useState } from "react";
import { useSphere } from "use-cannon";
import { useFrame } from "react-three-fiber";

export default function Obstacle({ props, number }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 3, 0],
    ...props,
  }));
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
  useFrame(() => {});
  return (
    <instancedMesh
      ref={ref}
      receiveShadow
      castShadow
      args={[null, null, number]}
    >
      <sphereBufferGeometry attach="geometry" args={[0.5]} />
      <meshLambertMaterial attach="material" color="grey" />
    </instancedMesh>
  );
}

import React, { useEffect, useState, useMemo } from "react";
import { useSphere } from "use-cannon";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";

export default function Obstacle({
  props,
  number,
  asteroid,
  setAsteroid,
  obstaclePart,
  setObstaclePart,
}) {
  const [ref, api] = useSphere(() => ({
    mass: 10000,
    position: [0, -3, 0],
    ...props,
  }));
  const map = useLoader(
    THREE.TextureLoader,
    "three/miniGameSpaceship/obstacle/obstacle_texture.jpg"
  );
  let obstaclesPosition = [-6, -4, -2, 0, 2, 4, 6];
  let obstacleParts = [
    { time: 500, position: 20 },
    { time: 400, position: 35 },
    { time: 300, position: 50 },
  ];

  useMemo(() => {
    if (asteroid < number) {
      setTimeout(() => {
        console.log("asteroid", asteroid);
        console.log("part", obstaclePart);
        api.at(asteroid).angularVelocity.set(0, 0, 0);
        api.at(asteroid).velocity.set(0, 0, 0);
        api
          .at(asteroid)
          .position.set(
            obstaclesPosition[
              Math.floor(Math.random() * obstaclesPosition.length)
            ],
            obstacleParts[obstaclePart].position,
            0
          );
        setAsteroid(asteroid + 1);
      }, obstacleParts[obstaclePart].time);
    } else if (obstaclePart !== 2) {
      setObstaclePart(obstaclePart + 1);
      setAsteroid(0);
    }
  }, [asteroid]);

  return (
    <instancedMesh
      ref={ref}
      receiveShadow
      castShadow
      args={[null, null, number]}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
      <meshStandardMaterial attach="material" map={map} />
    </instancedMesh>
  );
}

import React, { useEffect, useState, useMemo } from "react";
import { useSphere } from "use-cannon";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";

export default function Obstacle({ props, number }) {
  const [ref, api] = useSphere(() => ({
    mass: 700,
    position: [0, -3, 0],
    ...props,
  }));
  const map = useLoader(
    THREE.TextureLoader,
    "three/miniGameSpaceship/obstacle/obstacle_texture.jpg"
  );
  const [asteroid, setAsteroid] = useState(1);
  let obstaclesPosition = [-6, -4, -2, 0, 2, 4, 6];
  let obstacleParts = [
    { time: 1000, velocity: 5 },
    { time: 600, velocity: 15 },
    { time: 500, velocity: 30 },
  ];
  const [obstaclePart, setObstaclePart] = useState(0);

  useMemo(() => {
    if (asteroid < number) {
      setTimeout(() => {
        console.log("asteroid", asteroid);
        console.log("part", obstaclePart);
        api
          .at(asteroid)
          .velocity.set(0, obstacleParts[obstaclePart].velocity, 0);
        api
          .at(asteroid)
          .position.set(
            obstaclesPosition[
              Math.floor(Math.random() * obstaclesPosition.length)
            ],
            7,
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

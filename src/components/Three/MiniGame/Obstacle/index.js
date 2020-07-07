import React, { useEffect, useState, useMemo } from "react";
import { useSphere } from "use-cannon";
import { useFrame, useLoader } from "react-three-fiber";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

export default function Obstacle({
  props,
  number,
  asteroid,
  setAsteroid,
  obstaclePart,
  setObstaclePart,
  setWaveMsg,
}) {
  const [ref, api] = useSphere(() => ({
    mass: 10000,
    position: [0, 20, 0],
    ...props,
  }));
  const map = useLoader(
    THREE.TextureLoader,
    "three/miniGameSpaceship/obstacle/obstacle_texture.jpg"
  );
  let desktopPositions = [-8, -6, -4, -2, 0, 2, 4, 6, 8];
  let mobilePositions = [-3, -2, -1, 0, 1, 2, 3];
  let difficulty = useState(0);
  let difficultyDesktopValues = [
    { time: 500, position: 20 },
    { time: 400, position: 35 },
    { time: 300, position: 50 },
  ];
  let difficultyMobileValues = [
    { time: 900, position: 20 },
    { time: 800, position: 25 },
    { time: 600, position: 30 },
  ];

  useMemo(() => {
    if (asteroid < number) {
      if (isMobile) {
        setTimeout(() => {
          api.at(asteroid).angularVelocity.set(0, 0, 0);
          api.at(asteroid).velocity.set(0, 0, 0);
          api
            .at(asteroid)
            .position.set(
              mobilePositions[
                Math.floor(Math.random() * mobilePositions.length)
              ],
              difficultyMobileValues[obstaclePart].position,
              0
            );

          setAsteroid(asteroid + 1);
        }, difficultyMobileValues[obstaclePart].time);
      } else {
        setTimeout(() => {
          api.at(asteroid).angularVelocity.set(0, 0, 0);
          api.at(asteroid).velocity.set(0, 0, 0);
          api
            .at(asteroid)
            .position.set(
              desktopPositions[
                Math.floor(Math.random() * desktopPositions.length)
              ],
              difficultyDesktopValues[obstaclePart].position,
              0
            );

          setAsteroid(asteroid + 1);
        }, difficultyDesktopValues[obstaclePart].time);
      }
    } else if (obstaclePart !== 2) {
      setTimeout(() => {
        setWaveMsg(true);
      }, 2000);
      setTimeout(() => {
        setWaveMsg(false);
        setObstaclePart(obstaclePart + 1);
        setAsteroid(0);
      }, 6000);
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

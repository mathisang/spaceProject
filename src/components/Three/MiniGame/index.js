import React from "react";
import { Canvas } from "react-three-fiber";
import { Physics } from "use-cannon";
import Rocket from "./Rocket";
import Obstacle from "./Obstacle";
import Ground from "./Ground";

export default () => (
  <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [0, 1, 7] }}>
    <ambientLight intensity={0.2} />
    <spotLight
      position={[30, 10, 10]}
      penumbra={1}
      intensity={0.5}
      castShadow
    />
    <Physics>
      <Rocket />
      <Obstacle position={[3, 30, 0]} />
      <Obstacle position={[0, 10, 0]} />
      <Ground />
    </Physics>
  </Canvas>
);

import React, { Suspense, useState } from "react";
import Earth from "./Earth";
import Moon from "./Moon";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Loading from "../../MiniGame/Loading";
import "./scene.scss";
import BackgroundSpace from "../../MiniGame/BackgroundSpace";

export default function Scene() {
  const [rotationBack, setRotationBack] = useState(0);
  return (
    <div className="desktop-scene">
      <Canvas
        sRGB
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 0], near: 0.01, far: 10000 }}
      >
        <ambientLight intensity={0.1} />
        <spotLight
          position={[-50, 80, 20]}
          penumbra={1}
          intensity={0.7}
          castShadow
        />
        <BackgroundSpace rotationBack={rotationBack} pointCount={2000} />
        <Suspense fallback={<Loading />}>
          <Earth />
          <Moon />
        </Suspense>
      </Canvas>
    </div>
  );
}

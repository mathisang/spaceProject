import React, { Suspense, useContext, useMemo, useState } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import "./scene.scss";
import Module from "./ProgressRocket";
import Loading from "../../MiniGame/Loading";
import Moon from "./Moon";
import MoonGameContext from "../Context";
import BackgroundSpace from "../../MiniGame/BackgroundSpace";

export default () => {
  const { progress, setMoon } = useContext(MoonGameContext);
  // state to handle different rotation on different axis and speed between components
  const [rotationBack, setRotationBack] = useState(0);
  return (
    <div className="scene">
      <Canvas
        sRGB
        gl={{ alpha: false }}
        camera={{ position: [0, 20, -40], near: 0.01, far: 10000 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("black"));
        }}
      >
        <ambientLight intensity={0.3} />
        <spotLight
          position={[10, 50, 20]}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <BackgroundSpace rotationBack={rotationBack} pointCount={500} />
        <Suspense fallback={<Loading />}>
          <Module progressProps={progress} />
          <Moon />
        </Suspense>
      </Canvas>
    </div>
  );
};

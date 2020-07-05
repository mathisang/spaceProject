import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import "./scene.scss";
import Module from "./ProgressRocket";
import Loading from "../../MiniGame/Loading";
import Moon from "./Moon";

export default () => {
  return (
    <div className="scene">
      <Canvas
        shadowMap
        sRGB
        gl={{ alpha: false }}
        camera={{ position: [0, 20, -40] }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("black"));
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[30, 10, 10]}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        <Suspense fallback={<Loading />}>
          <Module />
          <Moon />
        </Suspense>
      </Canvas>
    </div>
  );
};

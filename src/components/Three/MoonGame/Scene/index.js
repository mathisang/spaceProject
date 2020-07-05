import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import "./scene.scss";
import Module from "./ProgressRocket";
import Loading from "../../MiniGame/Loading";

export default () => {
  return (
    <div className="scene">
      <Canvas
        shadowMap
        sRGB
        gl={{ alpha: false }}
        camera={{ position: [0, 30, -30] }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("black"));
        }}
      >
        <ambientLight intensity={0.2} />
        <spotLight
          position={[30, 10, 10]}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        <Suspense fallback={<Loading />}>
          <Module />
        </Suspense>
      </Canvas>
    </div>
  );
};

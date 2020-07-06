import React, { Suspense, useContext, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import "./scene.scss";
import Module from "./ProgressRocket";
import Loading from "../../MiniGame/Loading";
import Moon from "./Moon";
import MoonGameContext from "../Context";

export default () => {
  const { progress, setMoon } = useContext(MoonGameContext);
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
        <ambientLight intensity={0.3} />
        <spotLight
          position={[10, 50, 20]}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Suspense fallback={<Loading />}>
          <Module progressProps={progress} />
          <Moon />
        </Suspense>
      </Canvas>
    </div>
  );
};

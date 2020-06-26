import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Physics } from "use-cannon";
import Rocket from "./Rocket";
import Obstacle from "./Obstacle";
import Ground from "./Ground";
import "./miniGame.scss";

export default () => {
  const [isTouched, setTouched] = useState(false);
  const [lifePoints, setLifePoints] = useState(3);

  useEffect(() => {
    if (isTouched) {
      setLifePoints(lifePoints - 1);
      setTimeout(() => {
        setTouched(false);
      }, 1000);
    }
  }, [isTouched]);

  function Loading() {
    return (
      <mesh visible position={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          opacity={0.6}
        />
      </mesh>
    );
  }

  return (
    <div className="minigame-container">
      <h1>Life : {lifePoints}</h1>
      <Canvas
        shadowMap
        sRGB
        gl={{ alpha: false }}
        camera={{ position: [0, 1, 7] }}
      >
        <ambientLight intensity={0.2} />
        <spotLight
          position={[30, 10, 10]}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        <Physics>
          <Suspense fallback={<Loading />}>
            <Rocket isTouched={isTouched} setTouched={setTouched} />
          </Suspense>
          {/*<Obstacle position={[3, 3, 0]} />
          <Obstacle position={[0, 3, 0]} />*/}
          <Obstacle number={2} />
        </Physics>
      </Canvas>
    </div>
  );
};

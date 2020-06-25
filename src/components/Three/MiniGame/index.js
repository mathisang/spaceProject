import React, { useEffect, useState } from "react";
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
          <Rocket isTouched={isTouched} setTouched={setTouched} />
          {/*<Obstacle position={[3, 3, 0]} />
          <Obstacle position={[0, 3, 0]} />*/}
          <Obstacle number={10} />
        </Physics>
      </Canvas>
    </div>
  );
};

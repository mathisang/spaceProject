import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import { Physics } from "use-cannon";
import Rocket from "./Rocket";
import Obstacle from "./Obstacle";
import Ground from "./Ground";
import "./miniGame.scss";

export default () => {
  const [isTouched, setTouched] = useState(false);
  const [lifePoints, setLifePoints] = useState(4);

  useEffect(() => {
    if (isTouched) {
      setTimeout(() => {
        setLifePoints(lifePoints - 1);
        setTouched(false);
      }, 1000);
    }
    console.log(isTouched);
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
          <Obstacle position={[3, 10, 0]} />
          <Obstacle position={[0, 10, 0]} />
          {/*<Ground />*/}
        </Physics>
      </Canvas>
    </div>
  );
};

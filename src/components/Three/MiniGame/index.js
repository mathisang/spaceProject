import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import { Physics } from "use-cannon";
import Rocket from "./Rocket";
import Obstacle from "./Obstacle";
import Ground from "./Ground";

export default () => {
  const [isTouched, setTouched] = useState(false);

  useEffect(() => {
    console.log(isTouched);
  }, [isTouched]);

  return (
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
  );
};

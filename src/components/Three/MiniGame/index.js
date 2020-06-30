import React, { useEffect, useState, Suspense, useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import { Physics } from "use-cannon";
import Rocket from "./Rocket";
import Obstacle from "./Obstacle";
import BackgroundSpace from "./BackgroundSpace";
import "./miniGame.scss";
import Loading from "./Loading";
import Gauge from "./Gauge";
import ColorBackground from "./ColorBackground";
import { useSpring, interpolate } from "react-spring/three";

export default () => {
  const [isTouched, setTouched] = useState(false);
  const [lifePoints, setLifePoints] = useState(3);
  const [isGameOn, setGameStatus] = useState(false);
  const [asteroid, setAsteroid] = useState(1);
  const [globalAsteroid, setGlobalAsteroid] = useState(0);
  const [obstaclePart, setObstaclePart] = useState(0);
  const [waveMsg, setWaveMsg] = useState(false);
  const [propsBackground, set] = useSpring(() => ({
    o: 4,
    from: { o: 0 },
    config: { duration: 6000 },
  }));
  useMemo(() => {
    obstaclePart !== 0 && setGlobalAsteroid(globalAsteroid + 50);
  }, [obstaclePart]);

  useEffect(() => {
    if (isTouched) {
      setLifePoints(lifePoints - 1);
      setTimeout(() => {
        setTouched(false);
      }, 1000);
    }
  }, [isTouched]);

  useMemo(() => {
    switch (asteroid + globalAsteroid) {
      case 1:
        set({ o: 0 });
        break;
      case 20:
        set({ o: 1 });
        break;
      case 40:
        set({ o: 2 });
        break;
      case 60:
        set({ o: 3 });
        break;
      case 80:
        set({ o: 4 });
        break;
      default:
    }
  }, [asteroid]);

  return (
    <div className="minigame-container">
      <h1>Life : {lifePoints}</h1>
      {!isGameOn && (
        <div className="rules">
          <h2>Première sortie dans l'espace</h2>
          <button onClick={() => setGameStatus(true)}>Commencer le jeu</button>
        </div>
      )}
      {waveMsg && (
        <div className="wave-message">
          <h2>Vague numéro {obstaclePart + 1} à venir</h2>
        </div>
      )}
      <Gauge globalAsteroid={globalAsteroid} asteroid={asteroid} />
      <Canvas
        shadowMap
        sRGB
        gl={{ alpha: false }}
        camera={{ position: [0, 1, 10], near: 0.01, far: 10000 }}
        onCreated={({ gl, camera }) => {
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
        <ColorBackground
          propsBackground={propsBackground.o.interpolate({
            range: [0, 1, 2, 3, 4],
            output: ["#1B5694", "#0C2B5A", "#051226", "#02060D", "black"],
          })}
        />
        <BackgroundSpace pointCount={500} />
        <Physics>
          <Suspense fallback={<Loading />}>
            <Rocket isTouched={isTouched} setTouched={setTouched} />
            {isGameOn && (
              <Obstacle
                setWaveMsg={setWaveMsg}
                obstaclePart={obstaclePart}
                setObstaclePart={setObstaclePart}
                asteroid={asteroid}
                setAsteroid={setAsteroid}
                number={30}
              />
            )}
          </Suspense>
        </Physics>
      </Canvas>
    </div>
  );
};

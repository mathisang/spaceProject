import React, { useEffect, useState, Suspense, useMemo, useRef } from "react";
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
import { isMobile } from "react-device-detect";
import { useSpring, animated } from "react-spring";
import DragComponent from "./Ground";
import { useDrag, useGesture } from "react-use-gesture";
import { heart } from "../../../assets/images";

export default ({ setGameBadge, gameBadge, setResultGame }) => {
  const [isTouched, setTouched] = useState(false);
  const [lifePoints, setLifePoints] = useState(3);
  const [isGameOn, setGameStatus] = useState(false);
  const [asteroid, setAsteroid] = useState(1);
  const [globalAsteroid, setGlobalAsteroid] = useState(0);
  const [obstaclePart, setObstaclePart] = useState(0);
  const [waveMsg, setWaveMsg] = useState(false);
  const [xPhonePos, setXPhonePos] = useState(0);
  const [startCounter, setStartCounter] = useState(5);
  /*const [propsDrag, setDrag] = useSpring(() => ({
    x: 0,
    y: 0,
  }));*/
  const counter = useRef(false);

  useEffect(() => {
    /*startCounter > 0
      ? (counter.current = setTimeout(() => {
          setStartCounter(startCounter - 1);
        }, 1000))
      : setGameStatus(true);*/
  }, [startCounter]);
  /*const [propsGesture, setGesture] = useState(1);
  const calcVel = () => {
    clearInterval(timer.current);
    setGesture(1);
    timer.current = setInterval(() => {
      setGesture(propsGesture + 0.1);
      console.log("work", propsGesture);
    }, 500);
  };
  const r = () => {
    clearInterval(timer.current);
    setGesture(0);
    console.log("fintio", propsGesture);
  };
  const bind = useDrag(({ down, movement: [x, y] }) => {
    setGesture(down ? calcVel : r);
  });*/

  /*useMemo(() => {
    console.log("gesture", propsGesture);
  }, [propsGesture]);*/

  useMemo(() => {
    obstaclePart !== 0 && setGlobalAsteroid(globalAsteroid + 30);
  }, [obstaclePart]);

  useEffect(() => {
    if (isTouched) {
      setLifePoints(lifePoints - 1);
      setTimeout(() => {
        setTouched(false);
      }, 1000);
    }
    if (lifePoints === 0) {
      setGameBadge((prevState) => {
        return {
          ...prevState,
          flightGame: "urss",
        };
      });
      setResultGame("loose");
    }
  }, [isTouched]);

  useEffect(() => {
    if (obstaclePart === 2) {
      if (asteroid === 30) {
        setGameBadge((prevState) => {
          return {
            ...prevState,
            flightGame: "usa",
          };
        });
        setResultGame("win");
      }
    }
  }, [asteroid]);

  const handleLeftClick = () => {
    console.log("gauche");
    setXPhonePos(xPhonePos - 1.5);
  };

  const handleRightClick = () => {
    console.log("droite");
    setXPhonePos(xPhonePos + 1.5);
  };

  return (
    <div className="minigame-container">
      <div className="health-container">
        <p>{lifePoints} x </p>
        <img src={heart} />
      </div>
      {!isGameOn && (
        <div className="rules">
          <h2>{startCounter}</h2>
        </div>
      )}
      {waveMsg && (
        <div className="wave-message">
          <h2>Vague numéro {obstaclePart + 1} à venir</h2>
        </div>
      )}
      {isMobile && (
        <div className="mobile-control">
          <div onClick={() => handleRightClick()} />
          <div onClick={() => handleLeftClick()} />
        </div>
      )}
      <Gauge globalAsteroid={globalAsteroid} asteroid={asteroid} />
      {/*<DragComponent propsDrag={propsDrag} setDrag={setDrag} />*/}
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
        <ColorBackground globalAsteroid={globalAsteroid} asteroid={asteroid} />
        <BackgroundSpace pointCount={500} />
        <Physics>
          <Suspense fallback={<Loading />}>
            <Rocket
              xPhonePos={xPhonePos}
              isTouched={isTouched}
              setTouched={setTouched}
            />
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

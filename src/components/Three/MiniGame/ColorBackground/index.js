import React, { useMemo } from "react";
import { a, useSpring } from "react-spring/three";
import { useThree } from "react-three-fiber";

const Plane = ({ propsBackground }) => {
  const { viewport } = useThree();
  return (
    <a.mesh
      rotation={[-0.1, 0, 0]}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial
        attach="material"
        color={propsBackground}
        depthTest={false}
      />
    </a.mesh>
  );
};

export default ({ globalAsteroid, asteroid }) => {
  const [propsBackground, set] = useSpring(() => ({
    o: 4,
    from: { o: 0 },
    config: { duration: 6000 },
  }));
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
    <Plane
      propsBackground={propsBackground.o.interpolate({
        range: [0, 1, 2, 3, 4],
        output: ["#1B5694", "#0C2B5A", "#051226", "#02060D", "black"],
      })}
    />
  );
};

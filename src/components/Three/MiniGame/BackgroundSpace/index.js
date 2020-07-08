import React, { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";

export default function BackgroundSpace({ pointCount, rotationBack }) {
  const refPoints = useRef();
  const [positions] = useMemo(() => {
    let positions = [];
    for (let point = 0; point < pointCount; point++) {
      // Placement des points avec calcul forme sphere
      const r = 5000;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      positions.push(
        r * Math.cos(theta) * Math.sin(phi) + (-5 + Math.random() * 10)
      );
      positions.push(
        r * Math.sin(theta) * Math.sin(phi) + (-5 + Math.random() * 10)
      );
      positions.push(r * Math.cos(phi) + (-5 + Math.random() * 10));
    }
    return [new Float32Array(positions)];
  }, [pointCount]);
  // fin
  useFrame(() => {
    rotationBack === 0
      ? (refPoints.current.rotation.y = refPoints.current.rotation.y -= 0.0005)
      : rotationBack === 1
      ? (refPoints.current.rotation.x = refPoints.current.rotation.x -= 0.001)
      : (refPoints.current.rotation.y = refPoints.current.rotation.y -= 0.0001);
  });
  return (
    <points ref={refPoints}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        color="white"
        size={20}
        // permet d'influencer la taille des points avec la profondeur de la caméra
        sizeAttenuation
      />
    </points>
  );
}

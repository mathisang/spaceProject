import React from "react";
import { a } from "react-spring/three";
import { useThree } from "react-three-fiber";

const Plane = ({ propsBackground }) => {
  const { viewport } = useThree();
  return (
    <a.mesh scale={[viewport.width, viewport.height, 1]}>
      <planeBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshPhysicalMaterial
        attach="material"
        color={propsBackground}
        depthTest={false}
      />
    </a.mesh>
  );
};

export default ({ propsBackground }) => {
  return <Plane propsBackground={propsBackground} />;
};

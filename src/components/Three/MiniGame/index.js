import React from 'react'
import { Canvas } from 'react-three-fiber'
import { Physics } from 'use-cannon'
import Rocket from "./Rocket"
import Ground from "./Ground"

export default () => (
    <Canvas shadowMap sRGB gl={{ alpha: false }} camera={{ position: [-1, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.2}/>
        <spotLight position={[30, 10, 10]} penumbra={1} intensity={1} castShadow/>
        <Physics>
            <Rocket/>
            <Ground/>
        </Physics>
    </Canvas>
)


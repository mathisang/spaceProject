import React, { useRef } from "react"
import * as THREE from "three"
import { Canvas, useThree, useFrame } from "react-three-fiber"
import Rocket from './Rocket'

const Controls = () => {
    const { gl, camera } = useThree()
    const orbitRef = useRef()

    useFrame(() => {
        //fonction appelée à chaque frame
        orbitRef.current.update()
    })

    return (
        <orbitControls
            maxPolarAngle={Math.PI / 3}
            minPolarAngle={Math.PI / 3}
            args={[camera, gl.domElement]}
            ref={orbitRef}
        />
    )
}

export default () => (
    <div>
        <Canvas camera={{ position: [0, 0, 5] }} onCreated={({ gl }) => {
            /*permet utilisation de cast et receive shader*/
            gl.shadowMap.enabled = true
            gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}>
            <ambientLight intensity={0.5}/>
            <spotLight position={[15, 20, 5]} penumbra={1} castShadow/>
            <Rocket/>
            <Controls/>
        </Canvas>
    </div>
)


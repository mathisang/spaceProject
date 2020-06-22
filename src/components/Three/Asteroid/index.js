import React, { useState, useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Canvas, extend, useThree, useFrame } from "react-three-fiber"
import "./asteroid.scss"

extend({ OrbitControls })

const Asteroid = () => {
    const [model, setModel] = useState()
    useEffect(() => {
        new GLTFLoader().load("three/asteroid/asteroid.gltf", setModel)
    })
    return (
        model ? <primitive object={model.scene}/> : null
    )
}

const Controls = () => {
    const { gl, camera } = useThree()
    const orbitRef = useRef()

    useFrame(() => {
        //fonction appelée à chaque frame
        orbitRef.current.update()
    })

    return (
        <orbitControls
            autoRotate
            maxPolarAngle={Math.PI / 3}
            minPolarAngle={Math.PI / 3}
            args={[camera, gl.domElement]}
            ref={orbitRef}
        />
    )
}

export default () => (
    <div className="three-container">
        <Canvas camera={{ position: [0, 0, 20] }} onCreated={({ gl }) => {
            /*permet utilisation de cast et receive shader*/
            gl.shadowMap.enabled = true
            gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}>
            <ambientLight intensity={4}/>
            <spotLight position={[30, 10, 10]} penumbra={1} intensity={6} castShadow/>
            <fog attach="fog" args={["black", 10, 30]}/>
            <Controls/>
            <Asteroid/>
        </Canvas>
    </div>
)

import React, { useState } from "react"
import { useSpring, a } from "react-spring/three"

const Rocket = () => {
    const [hovered, setHovered] = useState(false)
    const props = useSpring({
        color: hovered ? "black" : "grey"
    })

    return (
        <a.mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            castShadow
        >
            <boxBufferGeometry
                attach="geometry"
                args={[1, 1, 1]}/>
            <a.meshPhysicalMaterial attach="material" color={props.color}/>
        </a.mesh>
    )
}

export default () => (
    <Rocket/>
)
import React from "react"
import { useSphere } from 'use-cannon'
import { Sphere} from "drei"

export default function Obstacle(props) {
    const [ref] = useSphere(() => ({ mass: 1, position: [0, 5, 0], ...props }))
    return (
        <mesh>
        <Sphere receiveShadow castShadow ref={ref} args={[0.5]}>
        <meshLambertMaterial attach="material" color="grey" />
        </Sphere>
        </mesh>
)
}


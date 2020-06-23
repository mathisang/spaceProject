import React from "react"
import { useBox } from 'use-cannon'

const Rocket = (props) => {
    return (
        <mesh>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="yellow" />
        </mesh>
    )
}

export default () => (
    <Rocket/>
)
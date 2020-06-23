import React from "react"
import { useBox } from 'use-cannon'

const Rocket = (props) => {
    const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="grey" />
        </mesh>
    )
}

export default () => (
    <Rocket/>
)
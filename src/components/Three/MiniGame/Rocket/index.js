import React from "react"
import {useBox} from 'use-cannon'
import {Box} from "drei"
import {useFrame} from "react-three-fiber"
import {useDrag} from "react-use-gesture";



export default function Rocket({args = [1, 2, 1]}) {
    const [ref, api] = useBox(() => ({args}))

    useFrame(state => {
        api.position.set((state.mouse.x * state.viewport.width) / 2, -4, 0)
    })
    return (
        <mesh>
            <Box ref={ref} args={args}>
                <meshStandardMaterial attach="material" color="grey"/>
            </Box>
        </mesh>
    )
}

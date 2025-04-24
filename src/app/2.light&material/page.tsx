'use client'

import { FC } from 'react'
import { Canvas } from '@react-three/fiber'

const Page: FC = () => {
  return (
    <Canvas>
      <directionalLight></directionalLight>
      <mesh>
        <boxGeometry></boxGeometry>
        <meshPhysicalMaterial />
      </mesh>
    </Canvas>
  )
}

export default Page

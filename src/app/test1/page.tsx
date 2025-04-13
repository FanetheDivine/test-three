'use client'

import { FC } from 'react'
import { Canvas } from '@react-three/fiber'

const Page: FC = () => {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  )
}

export default Page

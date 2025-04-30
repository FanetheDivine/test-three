'use client'

import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import { Points } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { positionBuffer } from './positions'

export default function PointsAndLines() {
  const [rotationZ, setZ] = useState(0)
  useGSAP(() => {
    setZ(rotationZ + Math.PI / 40)
  })
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      {/* <Axes /> */}
      {/* <OrbitControls /> */}
      <Points rotation={[0, 0, rotationZ]} positions={positionBuffer}>
        <pointsMaterial color={'#4096ff'} size={0.05} />
      </Points>
    </Canvas>
  )
}

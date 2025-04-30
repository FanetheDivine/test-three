'use client'

import React from 'react'
import { OrbitControls, Points } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Axes } from '@/components/Axes'

const positions: number[][] = new Array(10000).fill(null).map((_, index) => {
  return new Array(3)
    .fill(null)
    .map(() => ((Math.random() - 0.5) * index) / 100)
})
const positionBuffer = new Float32Array(positions.flat())

export default function PointsAndLines() {
  return (
    <Canvas>
      <Axes />
      <OrbitControls />
      <Points limit={1000} positions={positionBuffer}>
        <pointsMaterial color={'#4096ff'} size={0.05} />
      </Points>
    </Canvas>
  )
}

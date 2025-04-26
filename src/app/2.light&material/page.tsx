'use client'

import { FC } from 'react'
import { Helper, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  DirectionalLightHelper,
  PointLightHelper,
  SpotLightHelper,
} from 'three'
import { Axes } from '@/components/Axes'

const Page: FC = () => {
  return (
    <Canvas shadows>
      <Axes />
      <OrbitControls />
      <ambientLight></ambientLight>
      <spotLight castShadow intensity={10} position={[1, 1, 1]}>
        <Helper type={SpotLightHelper} args={['red']}></Helper>
      </spotLight>
      <mesh castShadow>
        <boxGeometry></boxGeometry>
        <meshPhysicalMaterial color={'red'} />
      </mesh>
      <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  )
}
export default Page

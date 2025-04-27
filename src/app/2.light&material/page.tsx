'use client'

import { FC, RefObject, useRef } from 'react'
import { Helper, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  DirectionalLightHelper,
  HemisphereLightHelper,
  Mesh,
  Object3D,
  SpotLightHelper,
  Vector3,
} from 'three'
import { Axes } from '@/components/Axes'
import { Material } from './Material'

const Page: FC = () => {
  const meshRef = useRef<Mesh>(null)
  return (
    <Canvas shadows>
      <Axes />
      <OrbitControls />
      <Light meshRef={meshRef}></Light>
      <mesh castShadow ref={meshRef}>
        <boxGeometry></boxGeometry>
        <Material></Material>
      </mesh>
      <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  )
}
export default Page

const Light: FC<{ meshRef: RefObject<Mesh> }> = (props) => {
  const lightRef = useRef<Object3D>()
  useFrame(() => {
    if (lightRef.current && props.meshRef.current) {
      lightRef.current?.lookAt(
        props.meshRef.current.getWorldPosition(new Vector3()),
      )
    }
  })
  return (
    <directionalLight
      ref={(el) => {
        if (el) {
          lightRef.current = el
        }
      }}
      castShadow
      position={[1, 0.2, 1]}
      intensity={2}
    >
      <Helper type={DirectionalLightHelper} args={[1, 'black']}></Helper>
    </directionalLight>
  )
}

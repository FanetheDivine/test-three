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
import { fullContainer } from '@/styles'
import { createArgsController } from '@/components/ArgsController'
import { Axes } from '@/components/Axes'
import { cn } from '@/utils/classnames'
import { Light } from './Light'
import { Material } from './Material'
import { argOptions, defaultArgs } from './ThreeArgs'

const { ArgsController, useArgs } = createArgsController(defaultArgs)
const Page: FC = () => {
  const [args] = useArgs()
  const meshRef = useRef<Mesh>(null)
  return (
    <div className={cn(fullContainer, 'overflow-auto')}>
      <div className='flex min-w-[1000px] min-h-[600px] h-full'>
        <ArgsController
          className='w-[300px] max-h-full overflow-auto'
          options={argOptions}
        />
        <div className='flex-1'>
          <Canvas shadows camera={{ position: [0.4, 0.3, 5] }}>
            <Axes />
            <OrbitControls />
            <Light meshRef={meshRef} value={args.light}></Light>
            <mesh castShadow ref={meshRef}>
              <boxGeometry args={[2, 2, 2]}></boxGeometry>
              <Material value={args.material} />
            </mesh>
            <mesh
              receiveShadow
              position={[0, -1, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[10, 10]} />
              <meshStandardMaterial />
            </mesh>
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default Page

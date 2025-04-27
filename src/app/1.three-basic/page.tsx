'use client'

import { FC, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useImmer } from 'use-immer'
import { fullContainer } from '@/styles'
import { ArgsController } from '@/components/ArgsController'
import { Axes } from '@/components/Axes'
import { cn } from '@/utils/classnames'
import { CameraController, CameraControllerRef } from './CameraController'
import { Geometry } from './Geometry'
import { Light } from './Light'
import { Material } from './Material'
import { Mesh } from './Mesh'
import { getDefaultThreeArgs } from './ThreeArgs'

const Page: FC = () => {
  const [args, setArgs] = useImmer(getDefaultThreeArgs)
  const CameraControllerRef = useRef<CameraControllerRef>(null)
  useEffect(() => {
    CameraControllerRef.current?.updateCameraPosition(
      args.camera.value.position,
    )
  }, [args.camera.value.position])
  return (
    <div className={cn(fullContainer, 'overflow-auto')}>
      <div className='flex min-w-[1000px] min-h-[600px] h-full'>
        <ArgsController value={args} onChange={setArgs} />
        <div className='flex-1'>
          <Canvas>
            <Light value={args.light.value} />
            <Axes />
            <CameraController
              ref={CameraControllerRef}
              value={args.camera.value}
              onChange={(fn) => {
                setArgs((draft) => {
                  fn(draft.camera.value)
                })
              }}
            />
            <Mesh value={args.mesh.value}>
              <Geometry value={args.geometry.value} />
              <Material value={args.material.value} />
            </Mesh>
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default Page

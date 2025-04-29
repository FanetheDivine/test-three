'use client'

import { FC, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { fullContainer } from '@/styles'
import { createArgsController } from '@/components/ArgsController'
import { Axes } from '@/components/Axes'
import { cn } from '@/utils/classnames'
import { CameraController, CameraControllerRef } from './CameraController'
import { Geometry } from './Geometry'
import { Light } from './Light'
import { Material } from './Material'
import { Mesh } from './Mesh'
import { argOptions, defaultArgs } from './ThreeArgs'

const { ArgsController, useArgs } = createArgsController(defaultArgs)

const Page: FC = () => {
  const [args, setArgs] = useArgs()
  const CameraControllerRef = useRef<CameraControllerRef>(null)
  useEffect(() => {
    CameraControllerRef.current?.updateCameraPosition(args.camera.position)
  }, [args.camera.position])
  return (
    <div className={cn(fullContainer, 'overflow-auto')}>
      <div className='flex min-w-[1000px] min-h-[600px] h-full'>
        <ArgsController
          className='w-[300px] max-h-full overflow-auto'
          options={argOptions}
        />
        <div className='flex-1'>
          <Canvas>
            <Axes />
            <Light value={args.light} />
            <CameraController
              ref={CameraControllerRef}
              value={args.camera}
              onChange={(fn) => {
                setArgs((draft) => {
                  fn(draft.camera)
                })
              }}
            />

            <Mesh value={args.mesh}>
              <Geometry value={args.geometry} />
              <Material value={args.material} />
            </Mesh>
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default Page

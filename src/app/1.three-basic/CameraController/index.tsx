'use client'

import {
  forwardRef,
  useCallback,
  useRef,
  useEffect,
  useImperativeHandle,
} from 'react'
import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { debounce } from 'lodash-es'
import type { ArgOptionType } from '@/components/ArgsController'

export type CameraArgs = {
  /** 摄像头位置 */
  position: number[]
  /** 摄像头注视点 */
  target: number[]
}

export type CameraControllerRef = {
  /** 更新摄像机位置 */
  updateCameraPosition: (val: CameraArgs['position']) => void
}

/** 摄像机控制器 */
export const CameraController = forwardRef<
  CameraControllerRef,
  {
    value: CameraArgs
    onChange: (fn: (draft: CameraArgs) => void) => void
  }
>(function InnerCameraController(props, ref) {
  const { camera } = useThree()

  const updateCameraPosition = useCallback<
    CameraControllerRef['updateCameraPosition']
  >(
    (position) => {
      camera.position.set(...(position as [number, number, number]))
      camera.updateProjectionMatrix()
    },
    [camera],
  )
  useImperativeHandle(ref, () => ({ updateCameraPosition }))

  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      updateCameraPosition(props.value.position)
    }
  }, [props.value.position, updateCameraPosition])

  const deboOnChange = debounce(props.onChange, 50)
  return (
    <OrbitControls
      makeDefault
      target={props.value.target as [number, number, number]}
      onChange={(e) => {
        if (!e) return
        const { position } = e.target.object
        const target = e.target.target
        deboOnChange((draft) => {
          draft.position = [position.x, position.y, position.z]
          draft.target = [target.x, target.y, target.z]
        })
      }}
      enableDamping={false}
    />
  )
})

export const defaultCamera: CameraArgs = {
  position: [0.4, 0.4, 5],
  target: [0, 0, 0],
}

export const cameraOptions: ArgOptionType[] = [
  {
    label: '摄像机位置 (X)',
    key: ['position', '0'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '摄像机位置 (Y)',
    key: ['position', '1'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '摄像机位置 (Z)',
    key: ['position', '2'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '摄像机注视点 (X)',
    key: ['target', '0'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '摄像机注视点 (Y)',
    key: ['target', '1'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '摄像机注视点 (Z)',
    key: ['target', '2'],
    type: 'number',
    min: -10,
    max: 10,
  },
]

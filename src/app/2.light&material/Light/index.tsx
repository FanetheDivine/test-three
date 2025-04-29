import { FC, RefObject, useRef } from 'react'
import { Helper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { DirectionalLightHelper, Mesh, Object3D, Vector3 } from 'three'
import { ArgOptionType } from '@/components/ArgsController'

export type LightArgs = {
  /** 方向光 */
  directionalLight: {
    /** 强度 */
    intensity: number
    /** 位置 */
    position: [number, number, number]
  }
}
export const Light: FC<{ value: LightArgs; meshRef: RefObject<Mesh> }> = (
  props,
) => {
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
      position={props.value.directionalLight.position}
      intensity={props.value.directionalLight.intensity}
    >
      <Helper type={DirectionalLightHelper} args={[0.5, 'black']}></Helper>
    </directionalLight>
  )
}
export const defaultLight: LightArgs = {
  directionalLight: {
    intensity: 10,
    position: [1, 1, 2],
  },
}
export const lightOptions: ArgOptionType[] = [
  {
    label: '方向光强度',
    key: ['directionalLight', 'intensity'],
    type: 'number',
    min: 0,
    max: 10,
  },
  {
    label: '方向光位置 (X)',
    key: ['directionalLight', 'position', '0'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '方向光位置 (Y)',
    key: ['directionalLight', 'position', '1'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '方向光位置 (Z)',
    key: ['directionalLight', 'position', '2'],
    type: 'number',
    min: -10,
    max: 10,
  },
]

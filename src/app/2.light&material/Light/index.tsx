import { FC } from 'react'
import { ArgOptionType } from '@/components/ArgsController'

export type LightArgs = {
  /** 环境光 */
  ambientLight: {
    /** 强度 */
    intensity: number
  }
  /** 方向光 */
  directionalLight: {
    /** 强度 */
    intensity: number
    /** 位置 */
    position: [number, number, number]
  }
}
export const Light: FC<{ value: LightArgs }> = (props) => {
  return (
    <>
      <ambientLight intensity={props.value.ambientLight.intensity} />
      <directionalLight
        position={props.value.directionalLight.position}
        intensity={props.value.directionalLight.intensity}
      />
    </>
  )
}
export const defaultLight: LightArgs = {
  ambientLight: {
    intensity: 1,
  },
  directionalLight: {
    intensity: 1,
    position: [0, 0, 5],
  },
}
export const lightOptions: ArgOptionType[] = [
  {
    label: '环境光强度',
    key: ['ambientLight', 'intensity'],
    type: 'number',
    min: 0,
    max: 10,
  },
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

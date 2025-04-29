import { FC, PropsWithChildren } from 'react'
import type { ArgOptionType } from '@/components/ArgsController'

export type MeshArgs = {
  /** 缩放比，用于控制物体整体的缩放 */
  scale: number
  /** 旋转角度，分别表示 X、Y、Z 轴的旋转角度（单位：弧度） */
  rotation: [number, number, number]
  /** 位置，分别表示 X、Y、Z 坐标 */
  position: [number, number, number]
}
export const Mesh: FC<PropsWithChildren<{ value: MeshArgs }>> = (props) => {
  return (
    <mesh
      position={props.value.position}
      scale={props.value.scale}
      rotation={props.value.rotation}
    >
      {props.children}
    </mesh>
  )
}

export const defaultMesh: MeshArgs = {
  scale: 1,
  rotation: [0, 0, 0],
  position: [0, 0, 0],
}

export const meshOptions: ArgOptionType[] = [
  { label: '缩放比', key: 'scale', type: 'number', min: 0.5, max: 3 },
  {
    label: '位置 (X)',
    key: ['position', '0'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '位置 (Y)',
    key: ['position', '1'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '位置 (Z)',
    key: ['position', '2'],
    type: 'number',
    min: -10,
    max: 10,
  },
  {
    label: '旋转角度 (X)',
    key: ['rotation', '0'],
    type: 'number',
    min: -Math.PI * 2,
    max: Math.PI * 2,
  },
  {
    label: '旋转角度 (Y)',
    key: ['rotation', '1'],
    type: 'number',
    min: -Math.PI * 2,
    max: Math.PI * 2,
  },
  {
    label: '旋转角度 (Z)',
    key: ['rotation', '2'],
    type: 'number',
    min: -Math.PI * 2,
    max: Math.PI * 2,
  },
]

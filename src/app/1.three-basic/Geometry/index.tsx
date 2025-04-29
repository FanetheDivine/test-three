import { FC } from 'react'
import type { ArgOptionType } from '@/components/ArgsController'

export type GeometryArgs = {
  size: [number, number, number]
}

export const Geometry: FC<{ value: GeometryArgs }> = (props) => {
  return <boxGeometry args={props.value.size} />
}

export const defaultGeometry: GeometryArgs = {
  size: [2, 2, 2],
}

export const geometryOptions: ArgOptionType[] = [
  { label: '尺寸 (X)', key: ['size', '0'], type: 'number', min: 0.5, max: 3 },
  { label: '尺寸 (Y)', key: ['size', '1'], type: 'number', min: 0.5, max: 3 },
  { label: '尺寸 (Z)', key: ['size', '2'], type: 'number', min: 0.5, max: 3 },
]

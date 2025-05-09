import { FC } from 'react'
import type { ArgOptionType } from '@/components/ArgsController'

export type MaterialArgs = {
  /** 颜色，表示材质的颜色值（十六进制字符串，例如 #4096ff） */
  color: string
  /** 粗糙度，控制材质表面的光滑程度，范围为 0（光滑）到 1（粗糙） */
  roughness: number
  /** 金属度，控制材质的金属感，范围为 0（非金属）到 1（完全金属） */
  metalness: number
  /** 清漆强度，控制材质表面的清漆效果，范围为 0（无清漆）到 1（完全清漆） */
  clearcoat: number
  /** 清漆粗糙度，控制清漆表面的粗糙程度，范围为 0（光滑）到 1（粗糙） */
  clearcoatRoughness: number
}
export const Material: FC<{ value: MaterialArgs }> = (props) => {
  return (
    <meshPhysicalMaterial
      color={props.value.color}
      roughness={props.value.roughness}
      metalness={props.value.metalness}
      clearcoat={props.value.clearcoat}
      clearcoatRoughness={props.value.clearcoatRoughness}
    />
  )
}

export const defaultMaterial: MaterialArgs = {
  color: '#4096ff',
  roughness: 0.5,
  metalness: 0.8,
  clearcoat: 0.3,
  clearcoatRoughness: 0.1,
}

export const materialOptions: ArgOptionType[] = [
  { label: '颜色', key: 'color', type: 'color' },
  { label: '粗糙度', key: 'roughness', type: 'number', min: 0, max: 1 },
  { label: '金属度', key: 'metalness', type: 'number', min: 0, max: 1 },
  { label: '清漆强度', key: 'clearcoat', type: 'number', min: 0, max: 1 },
  {
    label: '清漆粗糙度',
    key: 'clearcoatRoughness',
    type: 'number',
    min: 0,
    max: 1,
  },
]

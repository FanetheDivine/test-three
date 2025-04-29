import { ArgOptionType } from '@/components/ArgsController/type'
import { defaultLight, lightOptions } from '../Light'
import { defaultMaterial, materialOptions } from '../Material'

export const defaultArgs = {
  material: defaultMaterial,
  light: defaultLight,
}
export const argOptions: ArgOptionType[] = [
  { type: 'group', key: 'light', label: '光照', children: lightOptions },
  { type: 'group', key: 'material', label: '材质', children: materialOptions },
]

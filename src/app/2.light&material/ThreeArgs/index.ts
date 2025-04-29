import { ArgOptionType } from '@/components/ArgsController/type'
import { defaultLight, lightOptions } from '../Light'
import { defaultMaterial, useMaterialOptions } from '../Material'
import { useMemo } from 'react'

export const defaultArgs = {
  material: defaultMaterial,
  light: defaultLight,
}
export function useArgOptions(args: typeof defaultArgs) {
  const materialOptions = useMaterialOptions(args.material)
  const options: ArgOptionType[] = useMemo(() => {
    return [
      { type: 'group', key: 'light', label: '光照', children: lightOptions },
      { type: 'group', key: 'material', label: '材质', children: materialOptions },
    ]
  }, [materialOptions])
  return options
}
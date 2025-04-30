import { FC, useMemo } from 'react'
import { getAllFitMaterialOptions } from './args'
import { MaterialArgs } from './type'

export { defaultMaterial, useMaterialOptions } from './args'

export const Material: FC<{
  value: MaterialArgs
}> = (props) => {
  const type = props.value.type
  const value = useMemo(() => {
    const fitOptions = getAllFitMaterialOptions(type)
    const res: any = {}
    fitOptions.forEach((option) => {
      const key = option.key as keyof MaterialArgs
      res[key] = props.value[key]
    })
    return res
  }, [props.value, type])
  switch (type) {
    case 'MeshBasicMaterial':
      return <meshBasicMaterial {...value}></meshBasicMaterial>
    case 'MeshLambertMaterial':
      return <meshLambertMaterial {...value}></meshLambertMaterial>
    case 'MeshPhongMaterial':
      return <meshPhongMaterial {...value}></meshPhongMaterial>
    case 'MeshStandardMaterial':
      return <meshStandardMaterial {...value}></meshStandardMaterial>
    case 'MeshPhysicalMaterial':
      return <meshPhysicalMaterial {...value}></meshPhysicalMaterial>
    default:
      throw new Error('材质种类错误')
  }
}

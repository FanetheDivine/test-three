import { ArgOptionType } from '@/components/ArgsController/type'
import { cameraOptions, defaultCamera } from '../CameraController'
import { defaultGeometry, geometryOptions } from '../Geometry'
import { defaultLight, lightOptions } from '../Light'
import { defaultMaterial, materialOptions } from '../Material'
import { defaultMesh, meshOptions } from '../Mesh'

export const defaultArgs = {
  camera: defaultCamera,
  mesh: defaultMesh,
  geometry: defaultGeometry,
  material: defaultMaterial,
  light: defaultLight,
}
export const argOptions: ArgOptionType[] = [
  { type: 'group', key: 'camera', label: '摄像机', children: cameraOptions },
  { type: 'group', key: 'mesh', label: '网格', children: meshOptions },
  {
    type: 'group',
    key: 'geometry',
    label: '几何体',
    children: geometryOptions,
  },
  { type: 'group', key: 'material', label: '材质', children: materialOptions },
  { type: 'group', key: 'light', label: '光照', children: lightOptions },
]

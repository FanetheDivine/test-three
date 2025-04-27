import { cameraOptions, defaultCamera } from '../CameraController'
import { defaultGeometry, geometryOptions } from '../Geometry'
import { defaultLight, lightOptions } from '../Light'
import { defaultMaterial, materialOptions } from '../Material'
import { defaultMesh, meshOptions } from '../Mesh'

export function getDefaultThreeArgs() {
  const args = {
    camera: {
      label: '摄像机',
      value: defaultCamera,
      options: cameraOptions,
    },
    mesh: {
      label: '网格',
      value: defaultMesh,
      options: meshOptions,
    },
    geometry: {
      label: '几何体',
      value: defaultGeometry,
      options: geometryOptions,
    },
    material: {
      label: '材质',
      value: defaultMaterial,
      options: materialOptions,
    },
    light: {
      label: '光照',
      value: defaultLight,
      options: lightOptions,
    },
  }
  return args
}

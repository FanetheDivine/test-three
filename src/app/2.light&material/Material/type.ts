import {
  MeshBasicMaterialProps,
  MeshLambertMaterialProps,
  MeshPhongMaterialProps,
  MeshPhysicalMaterialProps,
  MeshStandardMaterialProps,
  MeshToonMaterialProps,
} from '@react-three/fiber'

export type MaterialArgs = MaterialTypeMap[keyof MaterialTypeMap]

type MaterialTypeMap = {
  [key in keyof MaterialPropsMap]: { type: key } & MaterialPropsMap[key]
}

type MaterialPropsMap = {
  /**
   * 不受光照影响，适合 UI、辅助线、纯色物体等。
   * 渲染开销低。
   */
  MeshBasicMaterial: MeshBasicMaterialProps

  /**
   * 漫反射模型，受光照影响但没有高光。
   * 性能较好，适合低端设备。
   */
  MeshLambertMaterial: MeshLambertMaterialProps

  /**
   * 漫反射 + 镜面高光。
   * 适合有金属光泽感的表面。
   */
  MeshPhongMaterial: MeshPhongMaterialProps

  /**
   * 基于物理的渲染（PBR）。
   * 支持金属度和粗糙度。
   * 推荐现代项目使用。
   */
  MeshStandardMaterial: MeshStandardMaterialProps

  /**
   * MeshStandardMaterial 的增强版。
   * 支持透明、折射、清漆、厚度等高级效果。
   * 适合玻璃、水等复杂材质。
   */
  MeshPhysicalMaterial: MeshPhysicalMaterialProps

  /**
   * 卡通渲染材质。
   * 光照会分段，适合动漫、手绘风格。
   */
  MeshToonMaterial: MeshToonMaterialProps
}

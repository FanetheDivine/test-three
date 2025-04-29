export type LightArgs = {
  [key in keyof LightTypeMap]: CommonLightArgs & LightTypeMap[key]
}

type LightTypeMap = {
  /** 环境光 */
  ambientLight: {}
  /** 方向光 */
  directionalLight: Position
  /** 点光源 */
  pointLight: Position & Decay & Distance
  /** 聚光灯 */
  spotLight: Position &
    Decay &
    Distance & {
      /** 光锥顶角 */
      angle: number
      /** 阴影边缘柔软程度 */
      penumbra: number
    }
  /** 矩形光 */
  rectAreaLight: Position & {
    /** 矩形宽度 */
    width: number
    /** 矩形高度 */
    height: number
  }
  /** 半球光 */
  hemisphereLight: Position & {
    /** 地面光颜色 */
    groundColor: string
  }
}

type CommonLightArgs = {
  /** 是否展示 */
  visible: boolean
  /** 颜色 */
  color: string
  /** 强度 */
  intensity: number
}

type Position = {
  position: [number, number, number]
}

type Decay = {
  /** 衰减速度 */
  decay: number
}

type Distance = {
  /** 最远距离 */
  distance: number
}

import { CSSProperties, FC, ReactNode } from 'react'

/** 参数控制器种类及其携带的额外数据 */
export interface ArgTypeMap {
  /** 组合类型 */
  group: {
    children?: ArgOptionType[]
  }
  /** 颜色类型 */
  color: {}
  /** 数字类型 */
  number: {
    min: number
    max: number
  }
}

/** 配置项类型 */
export type ArgOptionType = {
  label: ReactNode
  key: string | string[]
} & ArgOptionMap[keyof ArgOptionMap]

type ArgOptionMap = {
  [key in keyof ArgTypeMap]: {
    type: key
  } & ArgTypeMap[key]
}

/** 所有可选的控制器组件类型 */
export type ArgCompMap = {
  [key in keyof ArgTypeMap]: FC<
    {
      className?: string
      style?: CSSProperties
      label?: ReactNode
      value?: any
      onChange?: (val: any) => void
    } & ArgTypeMap[key]
  >
}

import { CSSProperties, FC } from "react"

/** 受控参数的类型 */
export type ArgsType = {
  [key: string]: {
    label: string
    value: any
    options: OptionItem[]
  }
}

type OptionItemMap = {
  [key in keyof OptionTypeMap]: {
    type: key
  } & OptionTypeMap[key]
}

/** 单个参数的配置项 */
export type OptionItem = {
  label: string
  /** lodash get/set函数使用的路径 */
  path: string
} & OptionItemMap[keyof OptionItemMap]


/** 具体控制器组件的类型 */
export type OptionCompType = {
  [key in keyof OptionTypeMap]: FC<{
    value?: any
    onChange?: (val: any) => void
    label?: string
    path?: string
    className?: string
    style?: CSSProperties
  } & OptionTypeMap[key]>
}

/** 每种参数具有的特殊数据 用于该参数的配置项 以及对应控制器的接受参数 */
type OptionTypeMap = {
  /** 颜色类型 */
  color: {}
  /** 数字类型 */
  number: {
    min: number
    max: number
  }
  /** 单选类型 */
  select: {
    options: { value: string, label: string }[]
  }
}

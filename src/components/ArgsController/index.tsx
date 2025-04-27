import { FC } from 'react'
import { Collapse, ColorPicker, InputNumber, Slider } from 'antd'
import { get, set } from 'lodash-es'
import { Updater } from 'use-immer'
import { ColorComp } from './components/ColorComp'
import { NumberComp } from './components/NumberComp'

/** 受控参数的类型结构 */
export type ArgsBisicType = {
  [key: string]: {
    label: string
    value: any
    options: OptionItem[]
  }
}

type ArgsControllerProps<T> = {
  value: T
  onChange: Updater<T>
}
/** 参数控制器组件 */
export function ArgsController<T extends ArgsBisicType>(
  props: ArgsControllerProps<T>,
) {
  const collapseItems = Object.entries(props.value).map(([key, item]) => {
    return {
      label: item.label,
      children: (
        <div className='flex flex-col'>
          {item.options.map((option) => {
            return (
              <Option
                key={option.path}
                option={option}
                value={item.value}
                onChange={(fn) => {
                  props.onChange((draft) => {
                    fn(draft[key]['value'])
                  })
                }}
              />
            )
          })}
        </div>
      ),
    }
  })

  return (
    <Collapse
      className='w-[600px] max-h-full overflow-auto'
      items={collapseItems}
    ></Collapse>
  )
}

export type OptionItem = {
  label: string
  /** lodash get/set函数使用的路径 */
  path: string
} & (
  | {
      type: 'number'
      min: number
      max: number
    }
  | {
      type: 'color'
    }
  | {
      type: 'select'
      options: { value: string; label: string }[]
    }
)

type OptionProps = {
  value: any
  option: OptionItem
  onChange: (fn: Updater<any>) => void
}
/** 单个参数的控制器 */
const Option: FC<OptionProps> = (props) => {
  const { option } = props
  const value = get(props.value, option.path)
  const onChange = (val: any) => {
    props.onChange((draft) => {
      set(draft, option.path, val)
    })
  }
  if (option.type === 'color') {
    return (
      <ColorComp
        key={option.path}
        value={value}
        onChange={onChange}
      ></ColorComp>
    )
  }
  if (option.type === 'number') {
    return (
      <NumberComp
        key={option.path}
        label={option.label}
        value={value}
        onChange={onChange}
        min={option.min}
        max={option.max}
      />
    )
  }
  if (option.type === 'select') {
    return null
  }
}
/** 所有类型的控制器都具有的参数 */
export type CompCommonProps = {
  value: any
  onChange: (val: any) => void
}

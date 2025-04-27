import { FC } from 'react'
import { Collapse } from 'antd'
import { get, set } from 'lodash-es'
import { Updater } from 'use-immer'
import { ColorComp } from './components/ColorComp'
import { NumberComp } from './components/NumberComp'
import { SelectComp } from './components/SelectComp'
import type { ArgsType, OptionItem } from './type'

export type { ArgsType, OptionItem }

export type ArgsControllerProps = {
  value: ArgsType
  onChange: Updater<ArgsType>
}
/** 参数控制器组件 */
export function ArgsController(props: ArgsControllerProps) {
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
  switch (option.type) {
    case 'color':
      return <ColorComp value={value} onChange={onChange}></ColorComp>
    case 'number':
      return (
        <NumberComp
          label={option.label}
          value={value}
          onChange={onChange}
          min={option.min}
          max={option.max}
        />
      )
    case 'select':
      return (
        <SelectComp
          label={option.label}
          value={value}
          onChange={onChange}
          options={option.options}
        ></SelectComp>
      )
    default:
      throw new Error('错误的控制器类型')
  }
}

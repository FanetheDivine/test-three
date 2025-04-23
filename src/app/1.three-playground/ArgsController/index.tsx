import { FC } from 'react'
import { Collapse, ColorPicker, InputNumber, Slider } from 'antd'
import { get, set } from 'lodash-es'
import { Updater } from 'use-immer'
import type { ThreeArgs } from '../ThreeArgs'
import type { OptionItem } from '../page'

/** 控制器 */
export const ArgsController: FC<{
  value: ThreeArgs
  onChange: Updater<ThreeArgs>
}> = (props) => {
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
}

type ColorCompProps = {
  value: string
  onChange: (val: string) => void
}
const ColorComp: FC<ColorCompProps> = (props) => {
  return (
    <span className='flex items-center gap-2'>
      <span>颜色</span>
      <ColorPicker
        value={props.value}
        onChange={(val) => {
          props.onChange(val.toHexString())
        }}
        showText
      ></ColorPicker>
    </span>
  )
}

type NumberCompProps = {
  label: string
  value: number
  min: number
  max: number
  onChange: (val: number) => void
}
const NumberComp: FC<NumberCompProps> = (props) => {
  return (
    <span className='flex items-center gap-2'>
      <span className='w-24'>{props.label}</span>
      <InputNumber
        className='w-20'
        value={props.value}
        onChange={(val) => {
          if (val) {
            props.onChange(val)
          }
        }}
      ></InputNumber>
      <Slider
        className='w-80'
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
        step={0.01}
      ></Slider>
    </span>
  )
}

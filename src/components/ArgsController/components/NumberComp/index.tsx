import { FC } from 'react'
import { InputNumber, Slider } from 'antd'
import { OptionCompType } from '../../type'

export const NumberComp: OptionCompType['number'] = (props) => {
  return (
    <span className='flex items-center gap-2'>
      <span className='w-24'>{props.label}</span>
      <InputNumber
        className='w-20'
        value={props.value}
        onChange={(val) => {
          if (val !== null) {
            props.onChange?.(val)
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

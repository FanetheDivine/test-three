'use client'

import { InputNumber, Slider } from 'antd'
import { cn } from '@/utils/classnames'
import { ArgCompMap } from '../..'

export const NumberComp: ArgCompMap['number'] = (props) => {
  return (
    <span
      className={cn('flex flex-col gap-2', props.className)}
      style={props.style}
    >
      {props.label}
      <span className='flex items-center gap-2'>
        <InputNumber
          value={props.value}
          onChange={(val) => {
            if (val !== null) {
              props.onChange?.(val)
            }
          }}
        ></InputNumber>
        <Slider
          className='flex-1'
          min={props.min}
          max={props.max}
          value={props.value}
          onChange={props.onChange}
          step={0.01}
        ></Slider>
      </span>
    </span>
  )
}

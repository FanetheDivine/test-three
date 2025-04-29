'use client'

import { ColorPicker } from 'antd'
import { cn } from '@/utils/classnames'
import { ArgCompMap } from '../..'

export const ColorComp: ArgCompMap['color'] = (props) => {
  return (
    <span
      className={cn('flex items-center gap-2 cursor-auto', props.className)}
      style={props.style}
    >
      <span className='text-black'>{props.label}</span>
      <ColorPicker
        className={cn('inline-flex', props.className)}
        style={props.style}
        value={props.value}
        onChange={(val) => {
          props.onChange?.(val.toHexString())
        }}
        showText
      ></ColorPicker>
    </span>
  )
}

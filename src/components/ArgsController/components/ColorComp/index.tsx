'use client'

import { ColorPicker } from 'antd'
import { cn } from '@/utils/classnames'
import { ArgCompMap } from '../..'

export const ColorComp: ArgCompMap['color'] = (props) => {
  return (
    <ColorPicker
      className={cn('inline-flex', props.className)}
      style={props.style}
      value={props.value}
      onChange={(val) => {
        props.onChange?.(val.toHexString())
      }}
      showText
    ></ColorPicker>
  )
}

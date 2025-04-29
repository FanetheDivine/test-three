'use client'

import { ReactNode } from 'react'
import { Radio, Select } from 'antd'
import { cn } from '@/utils/classnames'
import { ArgCompMap } from '../..'

declare module '../..' {
  interface ArgTypeMap {
    select: {
      options: { label: ReactNode; value: any }[]
    }
  }
}

export const SelectComp: ArgCompMap['select'] = (props) => {
  return (
    <div className={cn('flex gap-2', props.className)} style={props.style}>
      {props.label}
      <Select
        className='flex-1'
        value={props.value}
        options={props.options}
        onSelect={(val) => props.onChange?.(val)}
      ></Select>
    </div>
  )
}

'use client'

import { Radio } from 'antd'
import { ArgCompMap } from '../..'

declare module '../..' {
  interface ArgTypeMap {
    select: {
      options: { label: string; value: string }[]
    }
  }
}

export const SelectComp: ArgCompMap['select'] = (props) => {
  return (
    <div className='flex flex-col cursor-auto'>
      <span className='text-lg text-black'>{props.label}</span>
      <Radio.Group
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        className='ml-4 flex flex-col'
      >
        {props.options.map((item) => {
          return (
            <Radio key={item.value} value={item.value}>
              {item.label}
            </Radio>
          )
        })}
      </Radio.Group>
    </div>
  )
}

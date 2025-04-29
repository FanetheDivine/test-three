'use client'

import { Switch } from 'antd'
import { cn } from '@/utils/classnames'
import { ArgCompMap } from '../..'

declare module '../..' {
  interface ArgTypeMap {
    switch: {}
  }
}

export const SwitchComp: ArgCompMap['switch'] = (props) => {
  return (
    <span
      className={cn('flex items-center gap-2 cursor-auto', props.className)}
      style={props.style}
    >
      <span className='text-black'>{props.label}</span>
      <Switch checked={props.value} onChange={props.onChange}></Switch>
    </span>
  )
}

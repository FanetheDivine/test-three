import { FC } from 'react'
import { ColorPicker } from 'antd'
import { OptionCompType } from '../../type'

export type ColorCompData = {}

export const ColorComp: OptionCompType['color'] = (props) => {
  return (
    <span className='flex items-center gap-2'>
      <span>颜色</span>
      <ColorPicker
        value={props.value}
        onChange={(val) => {
          props.onChange?.(val.toHexString())
        }}
        showText
      ></ColorPicker>
    </span>
  )
}

'use client'

import { CSSProperties, FC, memo } from 'react'
import { ColorComp } from './components/ColorComp'
import { NumberComp } from './components/NumberComp'
import { SelectComp } from './components/SelectComp'
import { SwitchComp } from './components/SwitchComp'
import { ArgOptionType } from './type'

/** 参数控制器的具体实现 */
export const ArgItem: FC<{
  value: any
  onChange: (newVal: any) => void
  option: ArgOptionType
  className?: string
  style?: CSSProperties
}> = memo(function ArgItemInner(props) {
  const { option, value, onChange, className, style } = props
  const { label, type } = option
  const commonProps = {
    label,
    value,
    onChange,
    className,
    style,
  }
  switch (type) {
    case 'color':
      return <ColorComp {...commonProps}></ColorComp>
    case 'number':
      return (
        <NumberComp
          {...commonProps}
          min={option.min}
          max={option.max}
        ></NumberComp>
      )
    case 'select':
      return <SelectComp {...commonProps} options={option.options}></SelectComp>
    case 'switch':
      return <SwitchComp {...commonProps}></SwitchComp>
    case 'group':
    default:
      throw new Error('类型错误')
  }
})

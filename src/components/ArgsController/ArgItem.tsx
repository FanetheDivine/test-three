'use client'

import { CSSProperties, FC, memo } from 'react'
import { ColorComp } from './components/ColorComp'
import { NumberComp } from './components/NumberComp'
import { SelectComp } from './components/SelectComp'
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
  const commonProps = {
    value,
    onChange,
    className,
    style,
  }
  switch (option.type) {
    case 'color':
      return <ColorComp {...commonProps}></ColorComp>
    case 'number':
      return (
        <NumberComp
          {...commonProps}
          min={option.min}
          max={option.max}
          label={option.label}
        ></NumberComp>
      )
    case 'select':
      return <SelectComp {...commonProps} options={option.options}></SelectComp>
    case 'group':
    default:
      throw new Error('类型错误')
  }
})

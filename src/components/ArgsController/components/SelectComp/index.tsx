import { Radio } from 'antd'
import { OptionCompType } from '../../type'

export const SelectComp: OptionCompType['select'] = (props) => {
  return (
    <div className='flex flex-col'>
      <span className='text-xl'>{props.label}</span>
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

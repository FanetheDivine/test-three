'use client'

import { CSSProperties, FC, memo, useCallback, useMemo } from 'react'
import { Collapse, CollapseProps } from 'antd'
import { produce } from 'immer'
import { get, set } from 'lodash-es'
import { create } from 'zustand'
import { ArgItem } from './ArgItem'
import { ArgCompMap, ArgOptionType, ArgTypeMap } from './type'

export type { ArgOptionType, ArgTypeMap, ArgCompMap }

/**
 * 创建一个参数控制器
 * @param defaultValue 参数对象初始值
 */
export function createArgsController<T>(defaultValue: T) {
  type Store = {
    value: T
    setValue: (newVal: any, path: string[]) => void
    setValueFn: (fn: (draft: T) => void) => void
  }
  const useStore = create<Store>((setStore) => {
    return {
      value: defaultValue,
      setValue: (newVal, path) => {
        setStore((state) => {
          const value = produce(state.value, (draft: any) => {
            set(draft, path, newVal)
          })
          return { value }
        })
      },
      setValueFn: (fn) => {
        setStore((state) => {
          const value = produce(state.value, fn)
          return { value }
        })
      },
    }
  })

  function useArgs(): [T, Store['setValueFn']]
  function useArgs<V>(selector: (value: T) => V): [V, Store['setValueFn']]

  /** 获取和更改参数对象 */
  function useArgs<V>(selector?: (value: T) => V) {
    const value = useStore((state) => {
      if (typeof selector === 'function') {
        return selector(state.value)
      } else {
        return state.value
      }
    })
    const setValueFn = useStore((state) => state.setValueFn)
    const setValue: Store['setValueFn'] = useCallback(
      (fn) => {
        setValueFn(fn)
      },
      [setValueFn],
    )
    return [value, setValue] as const
  }

  /** 内部使用 */
  const useValueInner = (path: string[]) => {
    const value = useStore((state) => {
      return get(state.value, path)
    })
    const _setValue = useStore((state) => {
      return state.setValue
    })
    const setValue = useCallback(
      (newVal: any) => {
        _setValue(newVal, path)
      },
      [_setValue, path],
    )
    return [value, setValue] as const
  }
  /** 多参数控制器 */
  const ArgsController: FC<{
    options: ArgOptionType[]
    parentPath?: string[]
    className?: string
    style?: CSSProperties
  }> = memo(function ArgsControllerInner(props) {
    const { parentPath, options } = props
    const collapseItems: CollapseProps['items'] = useMemo(() => {
      const res = options.map((option) => {
        const currentPath = (parentPath ?? []).concat(option.key)
        const currentKey = currentPath.join('.')
        const children = (() => {
          if (option.type === 'group') {
            if (!option.children || option.children.length === 0) {
              return null
            } else {
              return (
                <ArgsController
                  options={option.children}
                  parentPath={currentPath}
                ></ArgsController>
              )
            }
          }
          return (
            <ArgController
              key={currentKey}
              option={option}
              currentPath={currentPath}
            ></ArgController>
          )
        })()
        return {
          label: option.label,
          key: currentKey,
          children,
        }
      })
      return res
    }, [options, parentPath])
    return (
      <Collapse
        className={props.className}
        style={props.style}
        items={collapseItems}
      />
    )
  })

  /** 单参数控制器 */
  const ArgController: FC<{
    option: ArgOptionType
    currentPath: string[]
    className?: string
    style?: CSSProperties
  }> = memo(function ArgItemInner(props) {
    const { option, currentPath } = props
    const [value, setValue] = useValueInner(currentPath)
    return (
      <ArgItem
        className={props.className}
        style={props.style}
        value={value}
        onChange={setValue}
        option={option}
      ></ArgItem>
    )
  })

  return {
    /** 控制器组件 */
    ArgsController,
    /** 获取和修改当前参数 */
    useArgs,
  } as const
}

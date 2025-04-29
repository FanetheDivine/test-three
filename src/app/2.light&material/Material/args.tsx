import { useMemo } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Popover, Tag } from 'antd'
import { ArgOptionType } from '@/components/ArgsController'
import { MaterialArgs } from './type'

export const defaultMaterial: MaterialArgs = {
  type: 'MeshPhysicalMaterial',
  color: '#4096FF',
  transparent: true,
  opacity: 1,
  side: 0,
  reflectivity: 1,
  ior: 1.3,
  emissive: '#FFFFFF',
  emissiveIntensity: 0,
  roughness: 0.25,
  metalness: 0.5,
  clearcoat: 0.5,
  clearcoatRoughness: 0.5,
  transmission: 0.3,
  thickness: 1,
  sheen: 0,
  sheenRoughness: 1,
  sheenColor: '#000000',
}

const AllMaterialOptions: (ArgOptionType & {
  desc?: string
  fit?: MaterialArgs['type'][]
})[] = [
  {
    label: '颜色',
    key: 'color',
    type: 'color',
    desc: '物体表面的基础颜色',
  },
  {
    label: '透明开关',
    key: 'transparent',
    type: 'switch',
    desc: '是否启用透明度通道。',
  },
  {
    label: '透明度',
    key: 'opacity',
    type: 'number',
    min: 0,
    max: 1,
    desc: '控制材质的整体透明度,需要配合transparent属性使用。',
  },
  {
    label: '面朝向',
    key: 'side',
    type: 'select',
    options: [
      { label: '正面', value: 0 },
      { label: '背面', value: 1 },
      { label: '双面', value: 2 },
    ],
    desc: '渲染哪一面：正面、背面或双面。',
  },
  {
    label: '自发光颜色',
    key: 'emissive',
    type: 'color',
    desc: '材质自身发光颜色。',
    fit: [
      'MeshLambertMaterial',
      'MeshPhongMaterial',
      'MeshStandardMaterial',
      'MeshPhysicalMaterial',
      'MeshToonMaterial',
    ],
  },
  {
    label: '自发光强度',
    key: 'emissiveIntensity',
    type: 'number',
    min: 0,
    max: 10,
    desc: '控制自发光颜色的亮度。',
    fit: [
      'MeshLambertMaterial',
      'MeshPhongMaterial',
      'MeshStandardMaterial',
      'MeshPhysicalMaterial',
      'MeshToonMaterial',
    ],
  },
  {
    label: '粗糙度',
    key: 'roughness',
    type: 'number',
    min: 0,
    max: 1,
    desc: '控制表面的粗糙程度，决定反射是否清晰。粗糙度值越高，表面的反射越模糊，呈现磨砂效果；值越低，表面反射越清晰，类似镜面反射。通常用于表现不平滑、磨砂或者有纹理的表面，如石头、木材等。适用于金属和非金属材质。数值范围：0（完全光滑）到 1（非常粗糙）。',
    fit: ['MeshStandardMaterial', 'MeshPhysicalMaterial', 'MeshToonMaterial'],
  },
  {
    label: '金属度',
    key: 'metalness',
    type: 'number',
    min: 0,
    max: 1,
    desc: '控制材质表面是否具有金属感。金属度为 0 时，材质表现为非金属，金属度为 1 时，材质表现为完全金属。金属表面具有高反射率，其反射的颜色是材质的本身颜色，而非环境光。数值范围：0（完全非金属）到 1（完全金属）。金属度影响光泽度和反射强度，适用于各种金属和表面材质。适用场景包括金属、塑料和其他材料的表现。',
    fit: ['MeshStandardMaterial', 'MeshPhysicalMaterial', 'MeshToonMaterial'],
  },
  {
    label: '反射率',
    key: 'reflectivity',
    type: 'number',
    min: 0,
    max: 1,
    desc: '表面反射的强度。值越高，反射效果越强，适合表现镜面等反射强烈的材质。',
    fit: ['MeshStandardMaterial', 'MeshPhysicalMaterial', 'MeshPhongMaterial'],
  },
  {
    label: '折射率',
    key: 'ior',
    type: 'number',
    min: 1,
    max: 2.333,
    desc: '为非金属材质所设置的折射率',
    fit: ['MeshPhysicalMaterial'],
  },
  {
    label: '透光度',
    key: 'transmission',
    type: 'number',
    min: 0,
    max: 1,
    desc: '很薄的透明或者半透明的塑料、玻璃材质即便在几乎完全透明的情况下仍旧会保留反射的光线，透光性属性用于这种类型的材质。当透光率不为0的时候, opacity透明度应设置为1.',
    fit: ['MeshPhysicalMaterial'],
  },
  {
    label: '厚度',
    key: 'thickness',
    type: 'number',
    min: 0,
    max: 5,
    desc: '控制透明材质的体积厚度，用于模拟玻璃或类似材质的体积效果。较高的厚度值可以产生更强的折射效果，并影响材质的透明度表现。通常用于创建玻璃、液体等透光材质。',
    fit: ['MeshPhysicalMaterial'],
  },
  {
    label: '清漆层',
    key: 'clearcoat',
    type: 'number',
    min: 0,
    max: 1,
    desc: '有些类似于车漆，碳纤，被水打湿的表面的材质需要在面上再增加一个透明的，具有一定反光特性的面。而且这个面说不定有一定的起伏与粗糙度。',
    fit: ['MeshPhysicalMaterial'],
  },
  {
    label: '清漆粗糙度',
    key: 'clearcoatRoughness',
    type: 'number',
    min: 0,
    max: 1,
    desc: '控制清漆层的粗糙度。清漆层的粗糙度影响清漆表面的反射模糊度，粗糙度越高，反射越模糊，越低时反射越清晰。此属性主要影响涂层表面的光泽感与反射质量。适用场景：高光泽涂层、汽车漆、油漆表面。数值范围：0（完全光滑）到 1（非常粗糙）。',
    fit: ['MeshPhysicalMaterial'],
  },
  {
    label: '光泽层强度',
    key: 'sheen',
    type: 'number',
    min: 0,
    max: 1,
    desc: '可用于表示布料和织物材料,用于模拟丝绸、绒面、织物等柔软表面随角度变化的柔和高光。会在基本反射之外添加角度相关的次表面光泽。',
    fit: ['MeshPhysicalMaterial'],
  },
  {
    label: '光泽层颜色',
    key: 'sheenColor',
    type: 'color',
    fit: ['MeshPhysicalMaterial'],
  },
  {
    label: '布料光泽粗糙度',
    key: 'sheenRoughness',
    type: 'number',
    min: 0,
    max: 1,
    desc: '控制布料光泽的模糊程度。值越小，光泽越清晰；越大则越模糊，表现更柔和。用于加强丝绸、绒面等材质的真实感。',
    fit: ['MeshPhysicalMaterial'],
  },
]

export function getAllFitMaterialOptions(type: MaterialArgs['type']) {
  return AllMaterialOptions.filter(
    (item) => !item.fit || item.fit.includes(type),
  )
}

export function useMaterialOptions(material: MaterialArgs): ArgOptionType[] {
  const options = useMemo(() => {
    const type = material.type
    const typeOption: ArgOptionType = {
      type: 'select',
      label: '材质类型',
      key: 'type',
      options: [
        { label: '基础材质(MeshBasicMaterial)', value: 'MeshBasicMaterial' },
        {
          label: '漫反射材质(MeshLambertMaterial)',
          value: 'MeshLambertMaterial',
        },
        { label: '光照材质(MeshPhongMaterial)', value: 'MeshPhongMaterial' },
        {
          label: '标准材质(MeshStandardMaterial)',
          value: 'MeshStandardMaterial',
        },
        {
          label: '物理材质(MeshPhysicalMaterial)',
          value: 'MeshPhysicalMaterial',
        },
        { label: '卡通材质(MeshToonMaterial)', value: 'MeshToonMaterial' },
      ],
    }

    const dataOptions: ArgOptionType[] = getAllFitMaterialOptions(type).map(
      (item) => {
        const { label, desc, fit, key } = item
        const option: ArgOptionType = {
          ...item,
          label: (
            <div className='w-full flex flex-col gap-2'>
              <span className='flex items-center gap-1'>
                {label}({key})
                {desc ? (
                  <Popover
                    placement='topLeft'
                    className='max-w-80'
                    content={<div className='max-w-80'>{desc}</div>}
                  >
                    <InfoCircleOutlined></InfoCircleOutlined>
                  </Popover>
                ) : null}
              </span>
              <span className='flex flex-wrap items-center gap-1'>
                适用于
                {!fit
                  ? '所有材质'
                  : fit.map((s) => (
                      <Tag color='success' key={s}>
                        {s}
                      </Tag>
                    ))}
              </span>
            </div>
          ),
        }
        return option
      },
    )

    return [typeOption, ...dataOptions]
  }, [material.type])
  return options
}

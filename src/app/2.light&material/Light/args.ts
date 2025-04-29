import { ArgOptionType } from '@/components/ArgsController'
import { LightArgs } from './type'

const position: [number, number, number] = [1, 1, 2]
const color = '#FFFFFF'

export const defaultLight: LightArgs = {
  ambientLight: {
    visible: true,
    color,
    intensity: 1,
  },
  directionalLight: {
    visible: true,
    intensity: 1,
    color,
    position,
  },
  pointLight: {
    visible: false,
    intensity: 1,
    color,
    position,
    decay: 2,
    distance: 10,
  },
  spotLight: {
    visible: false,
    intensity: 1,
    color,
    position,
    decay: 2,
    distance: 10,
    angle: Math.PI / 4,
    penumbra: 1,
  },
  rectAreaLight: {
    visible: false,
    intensity: 1,
    color,
    position,
    width: 2,
    height: 1,
  },
  hemisphereLight: {
    visible: false,
    intensity: 1,
    color,
    position,
    groundColor: 'ff00ff',
  },
}

const commonLightOption: ArgOptionType[] = [
  { type: 'switch', label: '展示', key: 'visible' },
  { type: 'color', label: '颜色', key: 'color' },
  { type: 'number', label: '强度', key: 'intensity', min: 0, max: 10 },
]

const positionOption: ArgOptionType = {
  type: 'group',
  label: '位置',
  key: 'position',
  children: [
    {
      label: 'X',
      key: '0',
      type: 'number',
      min: -10,
      max: 10,
    },
    {
      label: 'Y',
      key: '1',
      type: 'number',
      min: -10,
      max: 10,
    },
    {
      label: 'Z',
      key: '2',
      type: 'number',
      min: -10,
      max: 10,
    },
  ],
}

const decayOption: ArgOptionType = {
  type: 'number',
  label: '衰减速度',
  key: 'decay',
  min: 0,
  max: 10,
}

const distanceOption: ArgOptionType = {
  type: 'number',
  label: '最远距离',
  key: 'distance',
  min: 0,
  max: 20,
}

export const lightOptions: ArgOptionType[] = [
  {
    type: 'group',
    label: '环境光',
    key: 'ambientLight',
    children: [...commonLightOption],
  },
  {
    type: 'group',
    label: '方向光',
    key: 'directionalLight',
    children: [...commonLightOption, positionOption],
  },
  {
    type: 'group',
    label: '点光源',
    key: 'pointLight',
    children: [
      ...commonLightOption,
      positionOption,
      decayOption,
      distanceOption,
    ],
  },
  {
    type: 'group',
    label: '聚光灯',
    key: 'spotLight',
    children: [
      ...commonLightOption,
      positionOption,
      decayOption,
      distanceOption,
      {
        type: 'number',
        label: '光锥顶角',
        key: 'angle',
        min: -Math.PI,
        max: Math.PI,
      },
      {
        type: 'number',
        label: '阴影边缘柔软程度',
        key: 'penumbra',
        min: 0,
        max: 1,
      },
    ],
  },
  {
    type: 'group',
    label: '矩形光',
    key: 'rectAreaLight',
    children: [
      ...commonLightOption,
      positionOption,
      {
        type: 'number',
        label: '宽度',
        key: 'width',
        min: 0,
        max: 10,
      },
      {
        type: 'number',
        label: '高度',
        key: 'height',
        min: 0,
        max: 10,
      },
    ],
  },
  {
    type: 'group',
    label: '半球光',
    key: 'hemisphereLight',
    children: [
      ...commonLightOption,
      positionOption,
      {
        type: 'color',
        label: '地面光',
        key: 'groundColor',
      },
    ],
  },
]

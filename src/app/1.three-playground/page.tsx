'use client'

import {
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { Line, Text, OrbitControls } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Slider, InputNumber, ColorPicker } from 'antd'
import { debounce, get, set } from 'lodash-es'
import * as THREE from 'three'
import { useImmer, Updater } from 'use-immer'
import { fullContainer } from '@/styles'
import { cn } from '@/utils/classnames'

type Camera = {
  /** 摄像头位置 */
  position: number[]
  /** 摄像头注视点 */
  target: number[]
}

type ThreeArgs = {
  /** 缩放比，用于控制物体整体的缩放 */
  scale: number
  /** 旋转角度，分别表示 X、Y、Z 轴的旋转角度（单位：弧度） */
  rotation: number[]
  /** 粗糙度，控制材质表面的光滑程度，范围为 0（光滑）到 1（粗糙） */
  roughness: number
  /** 金属度，控制材质的金属感，范围为 0（非金属）到 1（完全金属） */
  metalness: number
  /** 清漆强度，控制材质表面的清漆效果，范围为 0（无清漆）到 1（完全清漆） */
  clearcoat: number
  /** 清漆粗糙度，控制清漆表面的粗糙程度，范围为 0（光滑）到 1（粗糙） */
  clearcoatRoughness: number
  /** mesh 的位置，分别表示 X、Y、Z 坐标 */
  meshPosition: number[]
  /** 尺寸，分别表示物体在 X、Y、Z 轴上的大小 */
  size: number[]
  /** 颜色，表示材质的颜色值（十六进制字符串，例如 #4096ff） */
  color: string
  /** 环境光强度，控制场景中的环境光亮度 */
  ambientLightIntensity: number
  /** 方向光强度，控制方向光的亮度 */
  directionalLightIntensity: number
  /** 方向光位置，控制方向光的 X、Y、Z 坐标 */
  directionalLightPosition: number[]
  /** 摄像机配置 */
  camera: Camera
}
/** 控制器 */
const ArgsController: FC<{ value: ThreeArgs; onChange: Updater<ThreeArgs> }> = (
  props,
) => {
  const controls = [
    { label: '缩放比', key: 'scale', min: 0.5, max: 3 },
    { label: '位置 (X)', key: 'meshPosition[0]', min: -10, max: 10 },
    { label: '位置 (Y)', key: 'meshPosition[1]', min: -10, max: 10 },
    { label: '位置 (Z)', key: 'meshPosition[2]', min: -10, max: 10 },
    { label: '尺寸 (X)', key: 'size[0]', min: 0.5, max: 3 },
    { label: '尺寸 (Y)', key: 'size[1]', min: 0.5, max: 3 },
    { label: '尺寸 (Z)', key: 'size[2]', min: 0.5, max: 3 },
    {
      label: '旋转角度 (X)',
      key: 'rotation[0]',
      min: -Math.PI * 2,
      max: Math.PI * 2,
    },
    {
      label: '旋转角度 (Y)',
      key: 'rotation[1]',
      min: -Math.PI * 2,
      max: Math.PI * 2,
    },
    {
      label: '旋转角度 (Z)',
      key: 'rotation[2]',
      min: -Math.PI * 2,
      max: Math.PI * 2,
    },
    { label: '粗糙度', key: 'roughness', min: 0, max: 1 },
    { label: '金属度', key: 'metalness', min: 0, max: 1 },
    { label: '清漆强度', key: 'clearcoat', min: 0, max: 1 },
    { label: '清漆粗糙度', key: 'clearcoatRoughness', min: 0, max: 1 },
    { label: '环境光强度', key: 'ambientLightIntensity', min: 0, max: 10 },
    { label: '方向光强度', key: 'directionalLightIntensity', min: 0, max: 10 },
    {
      label: '方向光位置 (X)',
      key: 'directionalLightPosition[0]',
      min: -10,
      max: 10,
    },
    {
      label: '方向光位置 (Y)',
      key: 'directionalLightPosition[1]',
      min: -10,
      max: 10,
    },
    {
      label: '方向光位置 (Z)',
      key: 'directionalLightPosition[2]',
      min: -10,
      max: 10,
    },
    { label: '摄像机位置 (X)', key: 'camera.position[0]', min: -10, max: 10 },
    { label: '摄像机位置 (Y)', key: 'camera.position[1]', min: -10, max: 10 },
    { label: '摄像机位置 (Z)', key: 'camera.position[2]', min: -10, max: 10 },
    { label: '摄像机注视点 (X)', key: 'camera.target[0]', min: -10, max: 10 },
    { label: '摄像机注视点 (Y)', key: 'camera.target[1]', min: -10, max: 10 },
    { label: '摄像机注视点 (Z)', key: 'camera.target[2]', min: -10, max: 10 },
  ]
  const getValue = (key: string) => get(props.value, key)
  const createSetter = (key: string) => {
    return (val: any) => {
      props.onChange((draft) => {
        set(draft, key, val)
      })
    }
  }
  return (
    <div className='w-max max-h-full overflow-auto flex flex-col p-2 gap-2'>
      <span className='flex items-center gap-2'>
        <span>颜色</span>
        <ColorPicker
          value={props.value.color}
          onChange={(val) => {
            props.onChange((draft) => {
              draft.color = val.toHexString()
            })
          }}
          showText
        ></ColorPicker>
      </span>
      {controls.map((item) => {
        return (
          <span key={item.key} className='flex items-center gap-2'>
            <span className='w-24'>{item.label}</span>
            <InputNumber
              className='w-20'
              value={getValue(item.key)}
              onChange={createSetter(item.key)}
            ></InputNumber>
            <Slider
              className='w-80'
              min={item.min}
              max={item.max}
              value={getValue(item.key)}
              onChange={createSetter(item.key)}
              step={0.01}
            ></Slider>
          </span>
        )
      })}
    </div>
  )
}

/** 坐标轴 */
const Axes: FC = () => {
  const length = 10
  const offset = 0.25
  return (
    <>
      {/* X 轴 */}
      <Line
        points={[
          [0, 0, 0],
          [length, 0, 0], // X 轴正方向
        ]}
        color='red'
        lineWidth={2}
      />
      <Text position={[2, offset, 0]} fontSize={0.5} color='red'>
        X
      </Text>

      {/* Y 轴 */}
      <Line
        points={[
          [0, 0, 0],
          [0, length, 0], // Y 轴正方向
        ]}
        color='green'
        lineWidth={2}
      />
      <Text position={[offset, 2, 0]} fontSize={0.5} color='green'>
        Y
      </Text>

      {/* Z 轴 */}
      <Line
        points={[
          [0, 0, 0],
          [0, 0, length], // Z 轴正方向
        ]}
        color='blue'
        lineWidth={2}
      />
      <Text position={[offset, 0, 2]} fontSize={0.5} color='blue'>
        Z
      </Text>
    </>
  )
}

type CameraControllerRef = {
  /** 更新摄像机位置 */
  updateCameraPosition: (val: Camera['position']) => void
}
/** 摄像机控制器 */
const CameraController = forwardRef<
  CameraControllerRef,
  {
    value: Camera
    onChange: (fn: (draft: Camera) => void) => void
  }
>(function InnerCameraController(props, ref) {
  const { camera } = useThree()
  const updateCameraPosition = useCallback(
    (position: Camera['position']) => {
      camera.position.set(...(position as [number, number, number]))
      camera.updateProjectionMatrix()
    },
    [camera],
  )
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      updateCameraPosition(props.value.position)
    }
  }, [props.value.position, updateCameraPosition])
  useImperativeHandle(ref, () => ({ updateCameraPosition }))
  const deboOnChange = debounce(props.onChange, 50)
  return (
    <OrbitControls
      makeDefault
      target={props.value.target as [number, number, number]}
      onChange={(e) => {
        if (!e) return
        const { position } = e.target.object
        const target = e.target.target
        deboOnChange((draft) => {
          draft.position = [position.x, position.y, position.z]
          draft.target = [target.x, target.y, target.z]
        })
      }}
    />
  )
})

const Page: FC = () => {
  const [args, setArgs] = useImmer<ThreeArgs>({
    scale: 1,
    rotation: [0, 0, 0],
    roughness: 0.5,
    metalness: 0.8,
    clearcoat: 0.3,
    clearcoatRoughness: 0.1,
    meshPosition: [0, 0, 0],
    size: [2, 2, 2],
    color: '#4096ff',
    ambientLightIntensity: 1,
    directionalLightIntensity: 1,
    directionalLightPosition: [0, 0, 5],
    camera: {
      position: [0.4, 0.4, 5],
      target: [0, 0, 0],
    },
  })
  const CameraControllerRef = useRef<CameraControllerRef>(null)
  useEffect(() => {
    CameraControllerRef.current?.updateCameraPosition(args.camera.position)
  }, [args.camera.position])
  return (
    <div className={cn(fullContainer, 'overflow-auto')}>
      <div className='flex min-w-[1000px] min-h-[600px] h-full'>
        <ArgsController value={args} onChange={setArgs} />
        <div className='flex-1'>
          <Canvas>
            <ambientLight intensity={args.ambientLightIntensity} />
            <directionalLight
              position={
                args.directionalLightPosition as [number, number, number]
              }
              intensity={args.directionalLightIntensity}
            />
            <Axes />
            <CameraController
              ref={CameraControllerRef}
              value={args.camera}
              onChange={(fn) => {
                setArgs((draft) => {
                  fn(draft.camera)
                })
              }}
            />
            <mesh
              position={args.meshPosition as [number, number, number]}
              scale={args.scale}
              rotation={args.rotation as [number, number, number]}
            >
              <boxGeometry args={args.size as [number, number, number]} />
              <meshPhysicalMaterial
                color={args.color}
                roughness={args.roughness}
                metalness={args.metalness}
                clearcoat={args.clearcoat}
                clearcoatRoughness={args.clearcoatRoughness}
              />
            </mesh>
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default Page

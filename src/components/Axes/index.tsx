'use client'

import { FC } from 'react'
import { Line, Text } from '@react-three/drei'

/** 坐标轴 */
export const Axes: FC = () => {
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

import { FC, RefObject, useCallback, useRef } from 'react'
import { Helper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {
  DirectionalLightHelper,
  HemisphereLightHelper,
  Mesh,
  Object3D,
  PointLightHelper,
  SpotLightHelper,
  Vector3,
} from 'three'
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'
import { LightArgs } from './type'

export { defaultLight, lightOptions } from './args'

export const Light: FC<{ value: LightArgs; meshRef: RefObject<Mesh> }> = (
  props,
) => {
  const { lightRefFn } = useLookAt(props.meshRef)
  const {
    ambientLight,
    directionalLight,
    pointLight,
    spotLight,
    rectAreaLight,
    hemisphereLight,
  } = props.value
  return (
    <>
      <ambientLight {...ambientLight}></ambientLight>
      <directionalLight castShadow ref={lightRefFn} {...directionalLight}>
        {directionalLight.visible ? (
          <Helper type={DirectionalLightHelper} args={[0.5, 'red']}></Helper>
        ) : null}
      </directionalLight>
      <pointLight castShadow {...pointLight}>
        {pointLight.visible ? (
          <Helper type={PointLightHelper} args={[0.5, 'red']}></Helper>
        ) : null}
      </pointLight>
      <spotLight castShadow ref={lightRefFn} {...spotLight}>
        {spotLight.visible ? (
          <Helper type={SpotLightHelper} args={['red']}></Helper>
        ) : null}
      </spotLight>
      <rectAreaLight castShadow ref={lightRefFn} {...rectAreaLight}>
        {rectAreaLight.visible ? (
          <Helper type={RectAreaLightHelper} args={['red']}></Helper>
        ) : null}
      </rectAreaLight>
      <hemisphereLight {...hemisphereLight}>
        {hemisphereLight.visible ? (
          <Helper type={HemisphereLightHelper} args={[0.5, 'red']}></Helper>
        ) : null}
      </hemisphereLight>
    </>
  )
}

function useLookAt(meshRef: RefObject<Mesh>) {
  const lightSet = useRef<Set<Object3D>>()
  const lightRefFn = useCallback((el?: Object3D | null) => {
    if (!lightSet.current) {
      lightSet.current = new Set<Object3D>()
    }
    if (el) {
      lightSet.current.add(el)
    }
  }, [])
  useFrame(() => {
    if (!meshRef.current) return
    const target = meshRef.current.getWorldPosition(new Vector3())
    lightSet.current?.forEach((light) => {
      light.lookAt(target)
    })
  })
  return { lightRefFn }
}

"use client";

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type FrameConfig = {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  color: string
}

function FloatingFrame({ config, speed }: { config: FrameConfig; speed: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    groupRef.current.rotation.z = config.rotation[2] + Math.sin(state.clock.elapsedTime * speed) * 0.12
    groupRef.current.position.y = config.position[1] + Math.sin(state.clock.elapsedTime * speed * 0.8) * 0.18
  })

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={groupRef} position={config.position} rotation={config.rotation} scale={config.scale}>
        <mesh>
          <boxGeometry args={[1.8, 2.6, 0.08]} />
          <meshStandardMaterial color="#090912" emissive={config.color} emissiveIntensity={0.2} metalness={0.55} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.42, 2.16]} />
          <meshBasicMaterial color={config.color} transparent opacity={0.16} />
        </mesh>
      </group>
    </Float>
  )
}

function FilmRibbon({ color, rotation, radius, speed }: { color: string; rotation: [number, number, number]; radius: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z = rotation[2] + state.clock.elapsedTime * speed
  })

  return (
    <mesh ref={meshRef} rotation={rotation}>
      <torusGeometry args={[radius, 0.06, 12, 120]} />
      <meshStandardMaterial color="#100f1d" emissive={color} emissiveIntensity={0.32} roughness={0.3} metalness={0.5} />
    </mesh>
  )
}

function Scene({ intensity = 1 }: { intensity?: number }) {
  const frames = useMemo<FrameConfig[]>(
    () => [
      { position: [-2.8, 1.6, -0.8], rotation: [-0.3, 0.45, -0.25], scale: [0.95, 0.95, 0.95], color: '#ff1493' },
      { position: [2.9, 1.4, -1.4], rotation: [0.35, -0.5, 0.28], scale: [1.1, 1.1, 1.1], color: '#4d2dff' },
      { position: [-3.2, -1.5, -1.8], rotation: [0.2, 0.25, 0.4], scale: [0.8, 0.8, 0.8], color: '#ffd700' },
      { position: [2.2, -1.8, -0.6], rotation: [-0.2, -0.3, -0.25], scale: [0.88, 0.88, 0.88], color: '#9b30ff' },
    ],
    []
  )

  return (
    <>
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 6, 14]} />
      <ambientLight intensity={0.65 * intensity} />
      <directionalLight color="#ff1493" intensity={1.8 * intensity} position={[4, 5, 3]} />
      <directionalLight color="#4d2dff" intensity={1.4 * intensity} position={[-4, -3, 2]} />
      <pointLight color="#ffd700" intensity={0.8 * intensity} position={[0, 1, 2]} />

      {frames.map((frame, index) => (
        <FloatingFrame key={`${frame.color}-${index}`} config={frame} speed={0.6 + index * 0.15} />
      ))}

      <FilmRibbon color="#ff1493" radius={2.8} rotation={[1.05, 0.15, 0.1]} speed={0.08} />
      <FilmRibbon color="#4d2dff" radius={3.6} rotation={[1.22, -0.22, -0.18]} speed={-0.06} />

      <Sparkles color="#ffd700" count={40} noise={1.8} opacity={0.55} scale={[10, 6, 6]} size={2.4} speed={0.3} />
      <Sparkles color="#ff1493" count={28} noise={1.2} opacity={0.35} scale={[12, 8, 4]} size={2} speed={0.18} />
    </>
  )
}

export default function CinematicVoid({
  className = '',
  intensity = 1,
}: {
  className?: string
  intensity?: number
}) {
  return (
    <div className={className}>
      <Canvas camera={{ fov: 42, position: [0, 0, 8] }} dpr={[1, 1.5]}>
        <Scene intensity={intensity} />
      </Canvas>
    </div>
  )
}

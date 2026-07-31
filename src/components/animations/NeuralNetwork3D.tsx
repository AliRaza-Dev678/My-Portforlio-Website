"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ParticleSwarm() {
  const ref = useRef<THREE.Points>(null!);
  const { theme, systemTheme } = useTheme();
  
  // Determine if we should show a dark or light colored particle system
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const color = currentTheme === 'light' ? '#3b82f6' : '#60a5fa'; // Tailwind blue-500 or blue-400

  // Generate a random sphere of points
  const [positions] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.5 + Math.random() * 1.5; // Radius between 1.5 and 3

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow constant rotation
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      // Subtle mouse interaction
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      
      ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
      ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export function NeuralNetwork3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}

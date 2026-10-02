import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DigitalCore } from './DigitalCore';
import { OrbitRings } from './OrbitRings';
import { FloatingParticles } from './FloatingParticles';
import { Environment } from '@react-three/drei';

interface Hero3DSceneProps {
  mouseX: number;
  mouseY: number;
  reduceMotion?: boolean;
  isMobile?: boolean;
}

const SceneContent: React.FC<Hero3DSceneProps> = ({ mouseX, mouseY, reduceMotion = false, isMobile = false }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth damping towards the mouse position
    const targetX = mouseX * 0.5; // limit rotation range
    const targetY = mouseY * 0.5;

    // Damp rotation
    // Three.js MathUtils.damp applies an exponential decay
    if (!reduceMotion && !isMobile) {
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetY, 2, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetX, 2, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#B7FF3C" distance={10} />

      <group ref={groupRef}>
        <DigitalCore reduceMotion={reduceMotion} isMobile={isMobile} />
        {!isMobile && <OrbitRings reduceMotion={reduceMotion} />}
        {!isMobile && <FloatingParticles reduceMotion={reduceMotion} />}
      </group>

      <Environment preset="city" />
    </>
  );
};

export default function Hero3DScene({ mouseX, mouseY, reduceMotion = false, isMobile = false }: Hero3DSceneProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent mouseX={mouseX} mouseY={mouseY} reduceMotion={reduceMotion} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}

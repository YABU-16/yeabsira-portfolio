import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DigitalCoreProps {
  reduceMotion: boolean;
  isMobile?: boolean;
}

export const DigitalCore: React.FC<DigitalCoreProps> = React.memo(({ reduceMotion, isMobile = false }) => {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reduceMotion) return;
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.1;
      outerRef.current.rotation.x += delta * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.2;
      innerRef.current.rotation.z -= delta * 0.1;
    }
  });

  return (
    <group scale={isMobile ? 0.6 : 1}>
      {/* Outer Glass Sphere */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.5, 4]} />
        <meshPhysicalMaterial
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.1}
          ior={1.5}
          thickness={0.5}
          color="#ffffff"
          transparent
        />
      </mesh>
      
      {/* Inner Glowing Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#B7FF3C"
          emissive="#B7FF3C"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>
    </group>
  );
});

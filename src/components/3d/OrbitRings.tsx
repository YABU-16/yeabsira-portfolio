import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitRingsProps {
  reduceMotion: boolean;
}

export const OrbitRings: React.FC<OrbitRingsProps> = React.memo(({ reduceMotion }) => {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reduceMotion) return;
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, index) => {
        const speed = (index + 1) * 0.2;
        ring.rotation.x += delta * speed * (index % 2 === 0 ? 1 : -1);
        ring.rotation.y += delta * speed * 0.5;
      });
    }
  });

  return (
    <group ref={ringsRef}>
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshStandardMaterial color="#B7FF3C" emissive="#B7FF3C" emissiveIntensity={1} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, Math.PI / 6]}>
        <torusGeometry args={[2.8, 0.025, 16, 100]} />
        <meshStandardMaterial color="#cccccc" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
});

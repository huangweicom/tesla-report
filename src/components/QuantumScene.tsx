/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Line, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Augment JSX namespace to fix missing React Three Fiber intrinsic element types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      group: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
    }
  }
}

// Also augment 'react' module for environments using React.JSX
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      mesh: any;
      boxGeometry: any;
      meshStandardMaterial: any;
      group: any;
      sphereGeometry: any;
      meshBasicMaterial: any;
    }
  }
}

// --- HERO SCENE: Abstract Data Flow (Red/White/Grey) ---
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;
  
  // Generate positions and colors
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18; // Wider spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      
      // Mix of Red and Grey
      const isRed = Math.random() > 0.85;
      const color = new THREE.Color(isRed ? '#E31937' : '#666666');
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      
      // Dynamic flow rotation
      ref.current.rotation.y = t * 0.08;
      ref.current.rotation.x = Math.sin(t * 0.15) * 0.1;
      ref.current.rotation.z = Math.cos(t * 0.1) * 0.05;

      // "Breathing" motion (Inward/Outward pulse)
      const pulse = 1 + Math.sin(t * 0.3) * 0.1;
      ref.current.scale.set(pulse, pulse, pulse);
      
      // Gentle floating
      ref.current.position.y = Math.sin(t * 0.2) * 0.5;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none bg-tesla-dark">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <ambientLight intensity={0.5} />
        <Particles />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
             {/* Abstract geometric "structure" in the back */}
             <mesh position={[2, 2, -5]} rotation={[0, 0, Math.PI / 4]}>
                 <boxGeometry args={[5, 0.1, 5]} />
                 <meshStandardMaterial color="#333" wireframe />
             </mesh>
        </Float>
      </Canvas>
    </div>
  );
};

// --- STRATEGY SCENE: Neural Network / Connection ---
function NetworkNodes() {
    const groupRef = useRef<THREE.Group>(null);
    const nodes = 15;
    const radius = 4;

    // Create nodes arranged in a loose sphere
    const positions = useMemo(() => {
        return Array.from({length: nodes}, (_, i) => {
            const phi = Math.acos(-1 + (2 * i) / nodes);
            const theta = Math.sqrt(nodes * Math.PI) * phi;
            return new THREE.Vector3(
                radius * Math.cos(theta) * Math.sin(phi),
                radius * Math.sin(theta) * Math.sin(phi),
                radius * Math.cos(phi)
            );
        });
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
            groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Nodes */}
            {positions.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshBasicMaterial color={i % 3 === 0 ? "#E31937" : "#444"} />
                </mesh>
            ))}
            {/* Connections */}
            {positions.map((pos, i) => 
                positions.slice(i + 1).map((pos2, j) => {
                    if (pos.distanceTo(pos2) < 3.5) {
                        return (
                            <Line
                                key={`${i}-${j}`}
                                points={[pos, pos2]}
                                color="#333"
                                opacity={0.2}
                                transparent
                                lineWidth={1}
                            />
                        )
                    }
                    return null;
                })
            )}
        </group>
    )
}

export const NeuralNetScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={1} />
        <NetworkNodes />
      </Canvas>
    </div>
  );
}
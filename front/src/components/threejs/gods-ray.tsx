/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { TextureLoader, PlaneGeometry } from 'three';
import * as THREE from 'three';

import NoiseTexture from '@/assets/three/gr.jpeg';
import { rayVertexShader, rayFragmentShader } from '@/constants';

export const GodRays = () => {
  const shaderRef = useRef<any>(null!);
  const [aspectRatio, setAspectRatio] = useState(window.innerWidth / window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  const noiseTexture = useLoader(TextureLoader, NoiseTexture);

  const geometry = new PlaneGeometry(5 * aspectRatio, 6, 100, 5);
  return (
    <mesh ref={shaderRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <shaderMaterial
        vertexShader={rayVertexShader}
        fragmentShader={rayFragmentShader}
        side={THREE.FrontSide}
        uniforms={{
          resolution: { value: new THREE.Vector4() },
          uTexture: { value: noiseTexture },
          uFrequency: { value: new THREE.Vector2(10, 5) },
          uTime: { value: 0 },
        }}
        transparent
      />
    </mesh>
  );
};

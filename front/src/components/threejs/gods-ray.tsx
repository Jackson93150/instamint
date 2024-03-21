/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { TextureLoader, PlaneGeometry } from 'three';
import * as THREE from 'three';

import NoiseTexture from '@/assets/three/gr.jpeg';

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
  const vertexShader = `
    varying vec3 vWorldPosition;
    varying vec2 vUv;
    uniform float uTime;
    
    void main() {
      vUv = uv;
  
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
      float waveFrequency = 5.0; 
      float waveAmplitude = 0.15; 
      float waveSpeed = 1.0;
      float wave1 = sin(modelPosition.x * waveFrequency + uTime * waveSpeed) * waveAmplitude;
      float wave2 = sin(modelPosition.y * waveFrequency + uTime * waveSpeed) * waveAmplitude;
  
      modelPosition.z += (wave1 + wave2);
  
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    uniform sampler2D uTexture;
    void main() { 
      vec2 newUV = vUv;
      vec4 tt = texture2D(uTexture, vUv);
  
      gl_FragColor = vec4(vUv,0.,1.);
      float fade = smoothstep(0.1,0.9,abs(vUv.y));
      gl_FragColor = vec4(vWorldPosition,1.);
      gl_FragColor = vec4(tt.rgb,1.);
      gl_FragColor = vec4(vec3(tt),tt*0.7*fade);
    }`;

  const geometry = new PlaneGeometry(5 * aspectRatio, 6, 100, 5);
  return (
    <mesh ref={shaderRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
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

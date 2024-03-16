/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icosahedron, MeshDistortMaterial, Environment, PerformanceMonitor } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Bloom, Noise, BrightnessContrast } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useState } from 'react';

const Instances = ({ material }: any) => {
  const [sphereRefs] = useState<any[]>(() => []);
  const initialPositions: number[][] = [];

  for (let i = 0; i < 75; i++) {
    const position = [
      Math.floor(Math.random() * 49) - 24,
      Math.floor(Math.random() * 49) - 24,
      Math.floor(Math.random() * 35) - 35,
      Math.random() * (3 - 1) + 5,
      (Math.round(Math.random()) * 2 - 1) / 4,
    ];
    initialPositions.push(position);
  }

  useFrame((state, delta) => {
    sphereRefs.forEach((el, index) => {
      el.position.y += delta * initialPositions[index][3];
      el.position.x += delta * initialPositions[index][4];
      if (el.position.x > 25 || el.position.x < -25) initialPositions[index][4] = initialPositions[index][4] * -1;
      if (el.position.y > 28) el.position.y = -28;
      el.rotation.x += 0.02;
      el.rotation.y += 0.04;
      el.rotation.z += 0.04;
    });
  });
  return (
    <>
      {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          key={i}
          ref={(ref) => (sphereRefs[i] = ref)}
        />
      ))}
    </>
  );
};

const Scene = () => {
  const [material, set] = useState<any>();
  return (
    <mesh>
      <MeshDistortMaterial
        ref={set}
        roughness={0.1}
        metalness={0.05}
        radius={1}
        distort={0.3}
        transmission={0.65}
        color={'#55ff99'}
        emissive={'#55ff99'}
        emissiveIntensity={0.25}
      />
      {material && <Instances material={material} />}
    </mesh>
  );
};

export const Bubbles = () => {
  const [dpr, setDpr] = useState(1);

  return (
    <div className="fixed left-0 top-0 h-screen w-full">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 3] }}
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
        }}
        linear
      >
        <PerformanceMonitor onDecline={() => setDpr(0.5)}>
          <color attach="background" args={['#16502d']} />
          <fog color="#161616" attach="fog" near={1} far={50} />
          <Environment preset="lobby" />
          <Scene />
          <EffectComposer multisampling={0} enableNormalPass>
            <DepthOfField focusDistance={0.05} focalLength={0.1} bokehScale={3} />
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.2} opacity={2} blendFunction={BlendFunction.SCREEN} />
            <Noise premultiply opacity={0.2} blendFunction={BlendFunction.SOFT_LIGHT} />
            <BrightnessContrast contrast={-0.25} />
          </EffectComposer>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
};

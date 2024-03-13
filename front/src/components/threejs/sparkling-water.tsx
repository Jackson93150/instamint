/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icosahedron, MeshDistortMaterial, Environment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Noise, Vignette, ChromaticAberration, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useState } from 'react';
import { Vector2 } from 'three';

export const Instances = ({ material }: any) => {
  const [sphereRefs] = useState<any[]>(() => []);
  const initialPositions: any[][] = [];

  for (let i = 0; i < 75; i++) {
    const position = [
      Math.floor(Math.random() * 49) - 24,
      Math.floor(Math.random() * 49) - 24,
      Math.floor(Math.random() * 35) - 35,
      Math.random() * (3 - 1) + 5,
    ];
    initialPositions.push(position);
  }

  useFrame((state, delta) => {
    sphereRefs.forEach((el, index) => {
      el.position.y += delta * initialPositions[index][3];
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
        transmission={0.6}
        color={'#55ff99'}
        emissive={'#55ff99'}
        emissiveIntensity={0.2}
        toneMapped={false}
      />
      {material && <Instances material={material} />}
    </mesh>
  );
};

export const SparklingWater = () => {
  return (
    <div className="h-screen w-full">
      <Canvas
        dpr={1}
        camera={{ position: [0, 0, 3] }}
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
        }}
        linear
      >
        <color attach="background" args={['#16502d']} />
        <fog color="#161616" attach="fog" near={2} far={50} />
        <Environment preset="lobby" />
        <Scene />
        <EffectComposer multisampling={0} enableNormalPass>
          <DepthOfField focusDistance={0.005} focalLength={0.1} bokehScale={3} />
          <ChromaticAberration offset={new Vector2(0.008, 0.003)} radialModulation={true} modulationOffset={0.5} />
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.3} opacity={2} blendFunction={BlendFunction.SCREEN} />
          <Noise premultiply opacity={0.3} blendFunction={BlendFunction.AVERAGE} />
          <Vignette offset={0.2} darkness={0.3} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

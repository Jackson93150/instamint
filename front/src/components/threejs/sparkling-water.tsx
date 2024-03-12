/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icosahedron, useTexture, useCubeTexture, MeshDistortMaterial } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import { useEffect, useState } from 'react';
// import * as THREE from 'three';

import Bump from '@/assets/three/bump.jpg';
import Nx from '@/assets/three/cube/nx.png';
import Ny from '@/assets/three/cube/ny.png';
import Nz from '@/assets/three/cube/nz.png';
import Px from '@/assets/three/cube/px.png';
import Py from '@/assets/three/cube/py.png';
import Pz from '@/assets/three/cube/pz.png';

export const Instances = ({ material }: any) => {
  const [sphereRefs] = useState<any[]>(() => []);
  const initialPositions: any[][] = [];

  for (let i = 0; i < 50; i++) {
    const position = [
      Math.floor(Math.random() * 49) - 24,
      Math.floor(Math.random() * 49) - 24,
      Math.floor(Math.random() * 35) - 35,
      Math.random() * (0.8 - 0.1) + 0.05,
    ];
    initialPositions.push(position);
  }

  useFrame(() => {
    sphereRefs.forEach((el, index) => {
      el.position.y += initialPositions[index][3];
      if (el.position.y > 28) el.position.y = -28;
      el.rotation.x += 0.06;
      el.rotation.y += 0.06;
      el.rotation.z += 0.02;
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
  const bumpMap = useTexture(Bump);
  const envMap = useCubeTexture([Px, Nx, Py, Ny, Pz, Nz], {
    path: '',
  });
  const [material, set] = useState<any>();

  useEffect(() => {
    if (material) {
      material.emissive.set('#55ff99'); // Set the emissive color
      material.emissiveIntensity = 0.5; // Set the emissive intensity
    }
  }, [material]);

  return (
    <>
      <MeshDistortMaterial
        ref={set}
        envMap={envMap}
        bumpMap={bumpMap}
        roughness={0.1}
        metalness={0}
        bumpScale={0.005}
        radius={1.5}
        distort={0.3}
        transmission={1}
      />
      {material && <Instances material={material} />}
    </>
  );
};

export const SparklingWater = () => {
  return (
    <div className="h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 3] }}
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
        flat
        shadows
        linear
      >
        <color attach="background" args={['#16502d']} />
        <fog color="#161616" attach="fog" near={2} far={50} />
        <Scene />
        <EffectComposer multisampling={0} enableNormalPass>
          <DepthOfField focusDistance={0} focalLength={0.1} bokehScale={5} height={500} />
          {/* <Bloom luminanceThreshold={1} luminanceSmoothing={1} height={800} opacity={3} /> */}
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

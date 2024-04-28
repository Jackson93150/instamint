/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Bloom, BrightnessContrast, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useEffect, useRef, useState } from 'react';
import { BoxGeometry, TextureLoader } from 'three';
import * as THREE from 'three';

import Music from '@/assets/mock/music.jpeg';
import { nftVertexShader, nftFragmentShader, backgroundFragmentShader, backgroundVertexShader } from '@/constants';

interface Props {
  url: string;
  mediaType: 'video' | 'image' | 'audio';
}

export const Background = () => {
  const video = useRef(document.createElement('video'));
  const geometry = new THREE.PlaneGeometry(5, 6);
  video.current.src =
    'https://firebasestorage.googleapis.com/v0/b/instamint-446da.appspot.com/o/instamint%2Fscene.mp4?alt=media&token=20c63364-f862-4b00-bbce-4aa98f73ab38';
  video.current.crossOrigin = 'anonymous';
  video.current.loop = true;
  video.current.muted = true;
  video.current.play();
  const texture = useRef(new THREE.VideoTexture(video.current));

  return (
    <mesh>
      <bufferGeometry attach="geometry" {...geometry} />
      <shaderMaterial
        vertexShader={backgroundVertexShader}
        fragmentShader={backgroundFragmentShader}
        side={THREE.FrontSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTexture: { value: texture.current },
          uTime: { value: 0 },
        }}
      />
    </mesh>
  );
};

export const NftCard = ({ url, mediaType }: Props) => {
  const cardRef = useRef<any>(null!);
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
    if (cardRef.current) {
      cardRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  let nftTexture;
  mediaType === 'image' && (nftTexture = useLoader(TextureLoader, url));
  mediaType === 'audio' && (nftTexture = useLoader(TextureLoader, Music));
  if (mediaType === 'video') {
    const video = document.createElement('video');
    video.src = url;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.play();
    nftTexture = new THREE.VideoTexture(video);
  }

  useFrame(() => {
    cardRef.current.rotation.z = 0.6;
    cardRef.current.rotation.y += 0.01;
  });
  const geometry = new BoxGeometry(
    aspectRatio * (window.innerWidth < 480 ? 3 : 1),
    1.5 * aspectRatio * (window.innerWidth < 480 ? 3 : 1),
    0.03,
    10,
    10
  );
  return (
    <mesh ref={cardRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <shaderMaterial
        vertexShader={nftVertexShader}
        fragmentShader={nftFragmentShader}
        side={THREE.FrontSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          resolution: { value: new THREE.Vector4() },
          uTexture: { value: nftTexture },
          uTime: { value: 0 },
        }}
        transparent
      />
    </mesh>
  );
};

export const NftCardScene = ({ url, mediaType }: Props) => {
  return (
    <Canvas
      dpr={1}
      camera={{ position: [0, 0, 3] }}
      gl={{
        powerPreference: 'high-performance',
      }}
    >
      <Background />
      <NftCard url={url} mediaType={mediaType} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} opacity={0.8} blendFunction={BlendFunction.SCREEN} />
        <BrightnessContrast brightness={-0.1} contrast={0.2} />
      </EffectComposer>
    </Canvas>
  );
};

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useEffect, useRef, useState } from 'react';
import { BoxGeometry, TextureLoader } from 'three';
import * as THREE from 'three';

import Music from '@/assets/mock/music.jpeg';

interface Props {
  url: string;
  mediaType: 'video' | 'image' | 'audio';
}

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

  const vertexShader = `
    uniform float uTime;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;

    float random2D(vec2 value)
    {
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vUv = uv;
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      float glitchTime = uTime - modelPosition.y;
      float glitchStrength = sin(glitchTime) + sin(glitchTime * 2.34) +  sin(glitchTime * 5.67);
      glitchStrength /= 3.0;
      glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
      glitchStrength *= 0.15;
      modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
      modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;
      gl_Position = projectionMatrix * viewMatrix * modelPosition;
      vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
      vPosition = modelPosition.xyz;
      vNormal = modelNormal.xyz;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform sampler2D uTexture;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;

    void main() { 
      vec2 newUV = vUv;
      vec4 tt = texture2D(uTexture, vUv);
      vec3 normal = normalize(vNormal);

      float stripes = mod((vPosition.y - uTime * 0.1) * 20.0, 1.0);
      stripes = pow(stripes, 1.0);

      vec3 viewDirection = normalize(vPosition - cameraPosition);
      float fresnel = dot(viewDirection, normal) + 1.0;
      fresnel = pow(fresnel, 0.0);

      float holographic = stripes * fresnel;
      holographic += fresnel;

      gl_FragColor = vec4(vec3(tt), holographic);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`;

  useFrame(() => {
    cardRef.current.rotation.z = 0.6;
    cardRef.current.rotation.y += 0.01;
  });
  const geometry = new BoxGeometry(
    aspectRatio * (window.innerWidth < 480 ? 3 : 1),
    1.5 * aspectRatio * (window.innerWidth < 480 ? 3 : 1),
    0.02,
    10,
    10
  );
  return (
    <mesh ref={cardRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
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
    <Canvas dpr={1} camera={{ position: [0, 0, 3] }}>
      <color attach="background" args={['#000']} />
      <NftCard url={url} mediaType={mediaType} />
      <EffectComposer multisampling={0} enableNormalPass>
        <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} opacity={0.5} blendFunction={BlendFunction.SCREEN} />
      </EffectComposer>
    </Canvas>
  );
};

import { Canvas } from '@react-three/fiber';

import { SparklingWater } from '@/components/threejs/sparkling-water';

export const SparklingPage = () => {
  return (
    <div className="h-screen w-full">
      <Canvas style={{ backgroundColor: '#151d20' }} flat linear>
        <SparklingWater />
      </Canvas>
    </div>
  );
};

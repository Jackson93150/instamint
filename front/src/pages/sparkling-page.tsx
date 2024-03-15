import { Canvas } from '@react-three/fiber';

import { Bubbles } from '@/components/threejs/bubbles';

export const SparklingPage = () => {
  return (
    <div className="h-screen w-full">
      <Canvas style={{ backgroundColor: '#151d20' }} flat linear>
        <Bubbles />
      </Canvas>
    </div>
  );
};

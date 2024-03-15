import { Canvas } from '@react-three/fiber';

import { HomeHeaderSection, GodRays } from '@/components';
export const HomePage = () => {
  return (
    <div className="flex h-fit w-screen flex-col">
      <div className="absolute left-0 top-0 z-0 h-screen w-full">
        <Canvas
          dpr={1}
          camera={{ position: [0, 0, 3] }}
          gl={{
            powerPreference: 'high-performance',
          }}
          linear
        >
          <GodRays />
        </Canvas>
      </div>
      <HomeHeaderSection />
    </div>
  );
};

import { Canvas } from '@react-three/fiber';
import React, { ReactNode } from 'react';

import { Navbar, GodRays } from '@/components';

interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="z-ray absolute left-0 top-0 h-screen w-full">
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
      <main className="h-fit w-full">{children}</main>
    </React.Fragment>
  );
};

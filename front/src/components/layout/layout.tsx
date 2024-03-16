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
      <main className="h-fit w-full">{children}</main>
      <div className="pointer-events-none absolute left-0 top-0 h-screen w-full">
        <Canvas
          dpr={0.5}
          camera={{ position: [0, 0, 3] }}
          gl={{
            powerPreference: 'high-performance',
          }}
          linear
        >
          <GodRays />
        </Canvas>
      </div>
    </React.Fragment>
  );
};

import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar, GodRays } from '@/components';

interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => {
  const godRays = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const showRay = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    gsap.to(godRays.current, {
      opacity: 0.8,
      duration: 1,
      delay: 0.3,
    });
  });

  return (
    <React.Fragment>
      <Navbar />
      <main className="h-fit w-full">{children}</main>
      {showRay && (
        <div ref={godRays} className="pointer-events-none absolute left-0 top-0 h-screen w-full opacity-0">
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
      )}
    </React.Fragment>
  );
};

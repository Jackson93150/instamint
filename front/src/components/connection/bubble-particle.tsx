import { useRef, useEffect, useState } from 'react';

export const BubbleParticle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      canvas.width = windowSize.width;
      canvas.height = windowSize.height;
    };

    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.round(Math.random()) * 2 - 1) / 3;
        this.vy = -(Math.random() * 2 + 1) / 1.25;
        this.color = '#55ff99';
        this.size = Math.random() * 25 + 5;
        this.opacity = Math.random() * (0.5 - 0.2) + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -30 || this.x > canvas!.width + 30) {
          this.vx *= -1;
          this.y = canvas!.height + 30;
        }
        if (this.y < -30) {
          this.y = canvas!.height + 30;
        }
      }

      draw() {
        if (ctx) {
          ctx.beginPath();
          ctx.globalAlpha = this.opacity;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      }
    }

    const particles: Particle[] = [];
    const numParticles = windowSize.width < 844 ? 25 : 50;
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      ctx && ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [windowSize]);

  return <canvas ref={canvasRef} className="absolute z-0 h-screen w-screen overflow-hidden" />;
};

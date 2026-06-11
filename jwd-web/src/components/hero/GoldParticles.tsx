'use client';

import { useEffect, useRef } from 'react';
import { seamPointAt } from './seam';

interface Particle {
  x: number; // 0–1 viewport space
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
}

/**
 * Gold dust drifting up from the kintsugi seam.
 * Canvas-based; disabled for reduced motion and hidden tabs.
 */
export function GoldParticles({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    /* Pre-rendered glow sprite — drawImage is ~20× cheaper than per-frame shadowBlur */
    const SPRITE = 32;
    const sprite = document.createElement('canvas');
    sprite.width = SPRITE;
    sprite.height = SPRITE;
    const sctx = sprite.getContext('2d')!;
    const grad = sctx.createRadialGradient(
      SPRITE / 2, SPRITE / 2, 0,
      SPRITE / 2, SPRITE / 2, SPRITE / 2,
    );
    grad.addColorStop(0, 'rgba(230,217,184,1)');
    grad.addColorStop(0.25, 'rgba(201,168,92,0.9)');
    grad.addColorStop(1, 'rgba(201,168,92,0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, SPRITE, SPRITE);

    const spawn = (): Particle => {
      const [sx, sy] = seamPointAt(Math.random());
      const maxLife = 160 + Math.random() * 200;
      return {
        x: sx / 100 + (Math.random() - 0.5) * 0.012,
        y: sy / 100,
        vx: (Math.random() - 0.5) * 0.00012,
        vy: -(0.00018 + Math.random() * 0.00035),
        r: 0.6 + Math.random() * 1.6,
        life: Math.random() * maxLife, // staggered starts
        maxLife,
      };
    };

    const particles: Particle[] = Array.from({ length: 38 }, spawn);

    const draw = () => {
      if (!running) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += 1;
        if (p.life >= p.maxLife) {
          particles[i] = spawn();
          particles[i].life = 0;
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;

        const t = p.life / p.maxLife;
        const alpha = t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;

        ctx.globalAlpha = alpha * 0.8;
        const size = p.r * 7;
        ctx.drawImage(sprite, p.x * w - size / 2, p.y * h - size / 2, size, size);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    />
  );
}

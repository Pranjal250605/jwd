'use client';

import { useId } from 'react';
import { Grain } from '@/components/kintsugi/Grain';

/**
 * Subtle premium atmosphere for otherwise-flat sections: soft gold ambient
 * glows, a faint seigaiha (青海波 — Japanese wave) pattern, and washi grain.
 * Everything sits well under 8% opacity so the section still reads clean.
 */
export function PremiumBackdrop({
  accent = '#9a7b2d',
  tone = 'light',
  mask = 'corner',
}: {
  accent?: string;
  tone?: 'light' | 'deep' | 'dark';
  mask?: 'corner' | 'bottom' | 'left';
}) {
  const id = useId().replace(/[:]/g, '');
  const stroke = tone === 'dark' ? 'rgba(201,168,92,0.7)' : accent;
  const patOpacity = tone === 'dark' ? 0.06 : 0.05;
  const maskImg =
    mask === 'bottom'
      ? 'linear-gradient(to top, #000 0%, transparent 60%)'
      : mask === 'left'
        ? 'radial-gradient(ellipse 60% 80% at 12% 50%, #000 0%, transparent 72%)'
        : 'radial-gradient(ellipse 65% 70% at 84% 22%, #000 0%, transparent 72%)';
  const rings = [40, 30, 20, 10];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* ambient glows */}
      <div
        className="absolute -right-[8%] -top-[16%] h-[40rem] w-[40rem]"
        style={{ background: `radial-gradient(circle, ${accent}12, transparent 64%)` }}
      />
      <div
        className="absolute -left-[12%] bottom-[-22%] h-[34rem] w-[34rem]"
        style={{ background: `radial-gradient(circle, ${accent}0d, transparent 64%)` }}
      />

      {/* seigaiha wave pattern, faint + masked */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ opacity: patOpacity, maskImage: maskImg, WebkitMaskImage: maskImg }}
      >
        <defs>
          <pattern id={`sg${id}`} width="84" height="42" patternUnits="userSpaceOnUse">
            <g fill="none" stroke={stroke} strokeWidth="1.1">
              {rings.map((r) => <circle key={`a${r}`} cx="0" cy="42" r={r} />)}
              {rings.map((r) => <circle key={`b${r}`} cx="84" cy="42" r={r} />)}
              {rings.map((r) => <circle key={`c${r}`} cx="42" cy="0" r={r} />)}
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#sg${id})`} />
      </svg>

      <Grain opacity={0.02} />
    </div>
  );
}

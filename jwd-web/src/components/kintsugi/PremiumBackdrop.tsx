'use client';

import { useId } from 'react';
import { Grain } from '@/components/kintsugi/Grain';

/**
 * Consistent premium atmosphere applied site-wide: a faint seigaiha (青海波 —
 * Japanese wave) pattern, soft gold ambient glows, and washi grain. Even,
 * gentle coverage so every section shares the same texture.
 */
export function PremiumBackdrop({
  accent = '#007ec4',
  tone = 'light',
  glow = true,
}: {
  accent?: string;
  tone?: 'light' | 'deep' | 'dark';
  glow?: boolean;
}) {
  const id = useId().replace(/[:]/g, '');
  const stroke = tone === 'dark' ? 'rgba(0,176,225,0.85)' : accent;
  const patOpacity = tone === 'dark' ? 0.1 : 0.085;
  // even coverage with a soft edge-fade so it never looks like a hard tile
  const maskImg = 'radial-gradient(ellipse 130% 120% at 50% 45%, #000 58%, transparent 100%)';
  const rings = [40, 30, 20, 10];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {glow && (
        <>
          <div className="absolute -right-[8%] -top-[16%] h-[40rem] w-[40rem]" style={{ background: `radial-gradient(circle, ${accent}12, transparent 64%)` }} />
          <div className="absolute -left-[12%] bottom-[-22%] h-[34rem] w-[34rem]" style={{ background: `radial-gradient(circle, ${accent}0d, transparent 64%)` }} />
        </>
      )}

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

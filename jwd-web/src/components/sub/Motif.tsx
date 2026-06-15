'use client';

import { useId } from 'react';
import type { MotifKey } from '@/content/themes';

/**
 * Subtle abstract section art. Each motif is a quiet generative pattern that
 * gives a section its own atmosphere — never loud, always behind the content.
 */
export function Motif({
  motif,
  accent,
  className,
  opacity = 0.06,
}: {
  motif: MotifKey;
  accent: string;
  className?: string;
  opacity?: number;
}) {
  const raw = useId();
  const id = raw.replace(/[:]/g, '');
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={`pointer-events-none ${className ?? ''}`}
      style={{ opacity }}
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {motif === 'enso' && (
        <g stroke={accent} fill="none" strokeLinecap="round">
          <path d="M150 52 C176 78 180 122 152 152 C124 182 74 182 44 156 C14 130 16 80 48 52 C76 27 120 26 148 46" strokeWidth={3} />
          <circle cx="100" cy="102" r="56" strokeWidth={0.8} strokeDasharray="3 7" opacity={0.5} />
          <circle cx="100" cy="102" r="78" strokeWidth={0.6} opacity={0.3} />
        </g>
      )}

      {motif === 'lattice' && (
        <>
          <defs>
            <pattern id={`lat${id}`} width="44" height="44" patternUnits="userSpaceOnUse">
              <g stroke={accent} strokeWidth={1} fill="none">
                <rect x="9" y="9" width="26" height="26" />
                <rect x="9" y="9" width="26" height="26" transform="rotate(45 22 22)" />
                <circle cx="22" cy="22" r="3" />
              </g>
            </pattern>
          </defs>
          <rect width="200" height="200" fill={`url(#lat${id})`} />
        </>
      )}

      {motif === 'blueprint' && (
        <>
          <defs>
            <pattern id={`bp${id}`} width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M22 0 H0 V22" stroke={accent} strokeWidth={0.5} fill="none" opacity={0.7} />
            </pattern>
          </defs>
          <rect width="200" height="200" fill={`url(#bp${id})`} />
          <g stroke={accent} strokeWidth={1.2} fill="none">
            <rect x="40" y="46" width="40" height="118" />
            <line x1="40" y1="70" x2="80" y2="70" strokeWidth={0.6} />
            <line x1="40" y1="94" x2="80" y2="94" strokeWidth={0.6} />
            <line x1="40" y1="118" x2="80" y2="118" strokeWidth={0.6} />
            <line x1="40" y1="142" x2="80" y2="142" strokeWidth={0.6} />
            <rect x="92" y="78" width="32" height="86" />
            <line x1="92" y1="102" x2="124" y2="102" strokeWidth={0.6} />
            <line x1="92" y1="126" x2="124" y2="126" strokeWidth={0.6} />
            <rect x="136" y="58" width="28" height="106" />
          </g>
        </>
      )}

      {motif === 'ripples' && (
        <>
          <g stroke={accent} fill="none">
            <circle cx="104" cy="108" r="18" strokeWidth={1} />
            <circle cx="104" cy="108" r="40" strokeWidth={1} opacity={0.7} />
            <circle cx="104" cy="108" r="64" strokeWidth={0.8} opacity={0.5} />
            <circle cx="104" cy="108" r="90" strokeWidth={0.7} opacity={0.35} />
          </g>
          <g fill={accent}>
            <circle cx="64" cy="54" r="2.4" />
            <circle cx="118" cy="44" r="3" />
            <circle cx="150" cy="78" r="2" />
            <circle cx="48" cy="120" r="2.2" />
            <circle cx="156" cy="140" r="2.6" />
          </g>
        </>
      )}

      {motif === 'mesh' && (
        <>
          <g stroke={accent} strokeWidth={1} fill="none">
            <path d="M-4 56 C56 18 140 96 204 44" />
            <path d="M-4 104 C56 74 140 150 204 104" opacity={0.7} />
            <path d="M-4 156 C56 128 140 196 204 150" opacity={0.5} />
            <path d="M40 -4 C70 70 30 140 60 204" opacity={0.4} />
            <path d="M150 -4 C120 70 170 140 140 204" opacity={0.4} />
          </g>
          <g fill={accent}>
            <circle cx="58" cy="44" r="2.4" />
            <circle cx="140" cy="96" r="2.4" />
            <circle cx="60" cy="138" r="2" />
            <circle cx="150" cy="64" r="2" />
            <circle cx="100" cy="118" r="2.6" />
          </g>
        </>
      )}
    </svg>
  );
}

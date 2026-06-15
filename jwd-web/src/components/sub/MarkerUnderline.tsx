'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * A hand-drawn "marker pen" underline that draws itself when scrolled into
 * view — Sequoia's signature editorial flourish, in the section accent.
 * Two slightly offset strokes give it a real felt-tip texture.
 */
export function MarkerUnderline({
  accent,
  className,
}: {
  accent: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const draw = {
    initial: { pathLength: 0 } as const,
    animate: inView ? { pathLength: 1 } : undefined,
  };
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      className={`h-[14px] lg:h-[18px] ${className ?? ''}`}
      fill="none"
    >
      {/* soft wide wash */}
      <motion.path
        d="M4 12 C40 7 78 15 116 10 C150 6 176 13 196 9"
        stroke={accent}
        strokeWidth={11}
        strokeLinecap="round"
        opacity={0.28}
        initial={draw.initial}
        animate={draw.animate}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
      />
      {/* crisp top stroke */}
      <motion.path
        d="M4 10 C42 5 76 13 114 8 C150 4 178 11 196 7"
        stroke={accent}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.85}
        initial={draw.initial}
        animate={draw.animate}
        transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
      />
    </svg>
  );
}

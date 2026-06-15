'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * A hand-drawn "marker pen" underline that draws itself when scrolled into
 * view — Sequoia's signature editorial flourish, in the section accent.
 */
export function MarkerUnderline({
  accent,
  className,
}: {
  accent: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      className={`h-2.5 ${className ?? ''}`}
      fill="none"
    >
      <motion.path
        d="M3 8 C36 4 70 11 104 7 C140 3 170 10 197 6"
        stroke={accent}
        strokeWidth={5}
        strokeLinecap="round"
        opacity={0.32}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
      />
    </svg>
  );
}

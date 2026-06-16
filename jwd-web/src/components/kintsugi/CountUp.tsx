'use client';

import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  to: number;
  decimals?: number;
  start?: boolean;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Counts up by writing directly to the DOM node via a ref — no per-frame
 * React re-render, so multiple counters animating at once stay smooth on
 * low-end hardware.
 */
export function CountUp({
  to,
  decimals = 0,
  start = true,
  duration = 1.8,
  prefix = '',
  suffix = '',
  className,
}: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;

    if (!start) {
      node.textContent = fmt(0);
      return;
    }
    if (reduce) {
      node.textContent = fmt(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = fmt(v);
      },
    });
    return () => controls.stop();
  }, [start, to, duration, decimals, prefix, suffix, reduce]);

  // SSR / first paint: render the final value so layout is stable, then the
  // effect resets to 0 and animates up when in view.
  return <span ref={ref} className={className}>{`${prefix}${to.toFixed(decimals)}${suffix}`}</span>;
}

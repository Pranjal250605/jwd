'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CountUp } from '@/components/kintsugi/CountUp';
import type { L, StatItem } from '@/content/types';

const EASE = [0.16, 1, 0.3, 1] as const;

export function StatsRow({
  items,
  tx,
  dark = false,
  accent = '#007ec4',
}: {
  items: StatItem[];
  tx: (l: L) => string;
  dark?: boolean;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const value = dark ? 'text-washi' : 'text-sumi';
  const label = dark ? 'text-washi/55' : 'text-sumi-soft';

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
      {items.map((s, i) => (
        <motion.div
          key={i}
          className="border-t pt-6"
          style={{ borderColor: `${accent}55` }}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
        >
          <div className={`font-en text-4xl font-light lg:text-5xl ${value}`}>
            <CountUp
              to={s.value}
              decimals={s.decimals ?? 0}
              start={inView}
              prefix={s.prefix ?? ''}
              suffix={s.suffix ?? ''}
            />
          </div>
          <div className={`mt-3 text-[0.7rem] uppercase tracking-[0.18em] ${label}`}>
            {tx(s.label)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

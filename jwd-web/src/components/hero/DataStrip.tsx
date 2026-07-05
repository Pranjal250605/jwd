'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, type MotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CountUp } from '@/components/kintsugi/CountUp';

const FX_FALLBACK = 41.2; // static fallback if the FX API is unreachable

function Stat({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 px-5 py-3 sm:px-8 ${className}`}>
      <span className="text-[11px] uppercase tracking-[0.3em] text-gold-pale/60">
        {label}
      </span>
      <span className="font-mono text-base text-washi sm:text-lg">
        {children}
      </span>
    </div>
  );
}

/** Frosted-glass live market strip — the hero's instant credibility signal. */
export function DataStrip({ fade }: { fade?: MotionValue<number> }) {
  const t = useTranslations('data');
  const reduce = useReducedMotion();
  const [fx, setFx] = useState(FX_FALLBACK);
  const [live, setLive] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStart(true), reduce ? 0 : 2300);
    return () => clearTimeout(timer);
  }, [reduce]);

  useEffect(() => {
    let cancelled = false;
    fetch('https://open.er-api.com/v6/latest/AED')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d?.rates?.JPY === 'number') {
          setFx(d.rates.JPY);
          setLive(true);
        }
      })
      .catch(() => {}); // fallback stays
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-50"
      style={fade ? { opacity: fade } : undefined}
    >
    <motion.div
      className="border-t border-gold-bright/15 bg-night/40 backdrop-blur-md"
      initial={reduce ? false : { y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex max-w-screen-2xl items-stretch justify-center divide-x divide-gold-bright/10 sm:justify-start">
        <Stat label={t('fxLabel')}>
          <span className="inline-flex items-center gap-2">
            <CountUp to={fx} decimals={2} start={start} prefix="¥" />
            {live && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-gold-bright/70">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-gold-bright"
                  style={{ animation: 'pulseDot 2s ease-in-out infinite' }}
                />
                {t('live')}
              </span>
            )}
          </span>
        </Stat>
        <Stat label={t('yieldLabel')} className="hidden sm:flex">
          <CountUp to={6.9} decimals={1} start={start} suffix="%" />
        </Stat>
        <Stat label={t('popLabel')} className="hidden md:flex">
          <CountUp to={3.1} decimals={1} start={start} prefix="+" suffix="%" />
        </Stat>
        <Stat label={t('taxLabel')}>
          <CountUp to={0} decimals={0} start={start} suffix="%" />
        </Stat>
      </div>
    </motion.div>
    </motion.div>
  );
}

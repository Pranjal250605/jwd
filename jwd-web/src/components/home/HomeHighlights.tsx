'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { useLocale } from 'next-intl';
import { Percent, TrendingUp, Users, Globe2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CountUp } from '@/components/kintsugi/CountUp';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { Motif } from '@/components/sub/Motif';
import { home } from '@/content/home';
import type { L } from '@/content/types';

const ACCENT = '#9a7b2d';
const EASE = [0.22, 1, 0.36, 1] as const;
type Lang = 'ja' | 'en';

const ICONS = [Percent, TrendingUp, Users, Globe2];

function TiltStatCard({
  stat,
  Icon,
  inView,
  delay,
  label,
}: {
  stat: { value: number; decimals?: number; prefix?: string; suffix?: string; href?: string };
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  inView: boolean;
  delay: number;
  label: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 16 });
  const sry = useSpring(ry, { stiffness: 180, damping: 16 });
  const glow = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(154,123,45,0.20), transparent 55%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 16);
    rx.set(-(py - 0.5) * 16);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.div
      className="h-full"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: EASE }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-sumi/8 bg-washi p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_40px_70px_-32px_rgba(32,37,31,0.4)]"
      >
        {stat.href && <Link href={stat.href} className="absolute inset-0 z-20" />}
        {/* gradient edge */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          style={{ background: `linear-gradient(150deg, ${ACCENT}14, transparent 55%)` }}
        />
        {/* cursor glow */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />

        <div style={{ transform: 'translateZ(45px)' }} className="relative flex h-full flex-col">
          <span
            className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl text-white"
            style={{ background: `linear-gradient(140deg, ${ACCENT}, #c9a85c)`, boxShadow: `0 12px 26px -10px ${ACCENT}` }}
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>

          <CountUp
            to={stat.value}
            decimals={stat.decimals ?? 0}
            prefix={stat.prefix ?? ''}
            suffix={stat.suffix ?? ''}
            start={inView}
            className="mb-7 bg-gradient-to-br from-gold to-gold-bright bg-clip-text font-en text-5xl font-light leading-none text-transparent lg:text-6xl"
          />

          <div className="mt-auto flex flex-col gap-3">
            <motion.span
              className="block h-px w-full origin-left"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, transparent)` }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : undefined}
              transition={{ duration: 1, delay: delay + 0.3, ease: EASE }}
            />
            <div className="flex items-center justify-between">
              <span className="text-[0.7rem] uppercase tracking-[0.18em] text-sumi-soft">{label}</span>
              {stat.href && (
                <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
                  View &rarr;
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HomeHighlights() {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const c = home.highlights;
  const display = locale === 'ja' ? 'font-jp' : 'font-sans';
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden bg-washi-deep py-28 lg:py-36">
      <Motif motif="enso" accent={ACCENT} className="absolute -right-[6%] top-[-10%] h-[34rem] w-[34rem]" opacity={0.05} />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-2/3 w-1/2"
        style={{ background: 'radial-gradient(ellipse at 20% 90%, rgba(154,123,45,0.08), transparent 65%)' }}
      />
      <div ref={ref} className="relative mx-auto max-w-screen-2xl px-7 lg:px-12">
        <div className="mb-14 flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold">{tx(c.label)}</span>
          <h2 className={`${display} max-w-2xl text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-sumi lg:text-[3rem]`}>
            {tx(c.title)}
          </h2>
          <MarkerUnderline accent={ACCENT} className="w-44 lg:w-64" />
          <p className="mt-2 max-w-xl text-sm font-light leading-loose text-sumi-soft">{tx(c.intro)}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.stats.map((s, i) => (
            <TiltStatCard
              key={i}
              stat={s}
              Icon={ICONS[i % ICONS.length]}
              inView={inView}
              delay={i * 0.1}
              label={tx(s.label)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

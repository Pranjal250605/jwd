'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useAnimationFrame,
  useReducedMotion,
} from 'framer-motion';
import { useLocale } from 'next-intl';
import { listings, type Listing } from '@/content/properties';
import { PropertyModal } from '@/components/home/PropertyModal';

const ACCENT = '#9a7b2d';
const RX = 380;
const RZ = 320;
type Lang = 'ja' | 'en';

function OrbitCard({
  p,
  i,
  n,
  rotation,
  locale,
  onSelect,
}: {
  p: Listing;
  i: number;
  n: number;
  rotation: ReturnType<typeof useMotionValue<number>>;
  locale: Lang;
  onSelect: () => void;
}) {
  const x = useTransform(rotation, (r) => Math.sin(((i / n) * 360 + r) * (Math.PI / 180)) * RX);
  const z = useTransform(rotation, (r) => Math.cos(((i / n) * 360 + r) * (Math.PI / 180)) * RZ);
  const opacity = useTransform(z, (v) => 0.35 + 0.65 * ((v + RZ) / (2 * RZ)));
  const transform = useMotionTemplate`translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px)`;

  return (
    <motion.article
      className="absolute left-1/2 top-1/2 w-[270px] cursor-pointer will-change-transform sm:w-[300px]"
      style={{ transform, opacity }}
      onClick={onSelect}
    >
      <div className="group overflow-hidden rounded-3xl border border-white/10 bg-washi shadow-[0_50px_90px_-35px_rgba(12,14,18,0.65)] transition-shadow duration-300 hover:shadow-[0_60px_100px_-30px_rgba(12,14,18,0.75)]">
        <div className="relative aspect-[5/4] overflow-hidden">
          <Image
            src={p.image}
            alt={locale === 'ja' ? p.nameJa : p.nameEn}
            fill
            sizes="300px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,14,18,0.82) 0%, rgba(12,14,18,0.2) 42%, transparent 70%)' }} />
          <div className="absolute right-3.5 top-3.5 flex flex-col items-center rounded-xl bg-washi/95 px-3 py-2 shadow-lg backdrop-blur-sm">
            <span className="font-en text-lg font-semibold leading-none" style={{ color: ACCENT }}>{p.yieldPct.toFixed(1)}%</span>
            <span className="mt-0.5 text-[7px] uppercase tracking-[0.14em] text-sumi-soft">{locale === 'ja' ? '目標利回り' : 'Target yield'}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-gold-pale/90">{locale === 'ja' ? p.typeJa : p.typeEn}</span>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/85">{p.area}</div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <h3 className="font-jp text-[0.95rem] font-bold leading-snug text-sumi">{locale === 'ja' ? p.nameJa : p.nameEn}</h3>
          <div className="flex items-center justify-between">
            <span className="font-en text-lg font-light text-sumi">AED {p.priceAed.toLocaleString('en-US')}</span>
            <span className="text-[9px] uppercase tracking-[0.18em] transition-colors group-hover:text-gold" style={{ color: ACCENT }}>
              {locale === 'ja' ? '詳細 →' : 'Details →'}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Property3DCarousel() {
  const reduce = useReducedMotion() ?? false;
  const locale = useLocale() as Lang;
  const rotation = useMotionValue(0);
  const dragging = useRef(false);
  const hovering = useRef(false);
  const moved = useRef(false);
  const lastX = useRef(0);
  const n = listings.length;
  const [active, setActive] = useState<Listing | null>(null);

  useAnimationFrame(() => {
    if (reduce || dragging.current || hovering.current || active) return;
    rotation.set(rotation.get() + 0.12);
  });

  return (
    <>
      <div
        className="relative h-[460px] cursor-grab touch-pan-y select-none active:cursor-grabbing sm:h-[520px]"
        style={{ perspective: 1500 }}
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => {
          hovering.current = false;
          dragging.current = false;
        }}
        onPointerDown={(e) => {
          dragging.current = true;
          moved.current = false;
          lastX.current = e.clientX;
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          const dx = e.clientX - lastX.current;
          lastX.current = e.clientX;
          if (Math.abs(dx) > 1) moved.current = true;
          rotation.set(rotation.get() + dx * 0.4);
        }}
        onPointerUp={() => (dragging.current = false)}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[680px] -translate-x-1/2 -translate-y-1/2"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(154,123,45,0.16) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {listings.map((p, i) => (
            <OrbitCard
              key={p.id}
              p={p}
              i={i}
              n={n}
              rotation={rotation}
              locale={locale}
              onSelect={() => {
                if (!moved.current) setActive(p);
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <PropertyModal listing={active} ja={locale === 'ja'} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

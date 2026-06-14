'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Grain } from '@/components/kintsugi/Grain';
import { SEAM_PATH } from '@/components/hero/seam';

const EASE = [0.16, 1, 0.3, 1] as const;

function Chars({
  text,
  delay,
  reduce,
}: {
  text: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <span aria-label={text} role="text" className="inline-block">
      {[...text].map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          aria-hidden
          className="inline-block"
          initial={reduce ? false : { y: '0.5em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: delay + i * 0.035, ease: EASE }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}

interface PageHeroProps {
  image: string;
  alt: string;
  label: string;
  title: string;
  subtitle?: string;
}

/**
 * Cinematic per-page hero: full-bleed photography under an indigo duotone
 * veil, slow ken-burns settle, scroll parallax, a kintsugi seam drawing
 * itself across the image, and a per-character title reveal.
 */
export function PageHero({ image, alt, label, title, subtitle }: PageHeroProps) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const contentO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex h-[86vh] min-h-[560px] items-end overflow-hidden bg-night-deep"
    >
      {/* Photography with parallax + ken-burns settle */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: reduce ? '0%' : imgY }}
      >
        <motion.div
          className="absolute inset-[-5%]"
          initial={reduce ? false : { scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Indigo duotone veils */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, #0a1020 0%, rgba(10,16,32,0.55) 34%, rgba(10,16,32,0.25) 60%, rgba(10,16,32,0.45) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(10,16,32,0.78) 0%, rgba(10,16,32,0.3) 48%, transparent 75%)',
        }}
      />
      {/* Gold horizon accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 30% 100%, rgba(201,168,92,0.16) 0%, transparent 70%)',
        }}
      />

      {/* Kintsugi seam accent, drawing across the right of the frame */}
      <svg
        aria-hidden
        className="absolute inset-y-0 right-0 h-full w-[42%] opacity-60"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d={SEAM_PATH}
          fill="none"
          stroke="#c9a85c"
          strokeWidth={1.6}
          strokeOpacity={0.55}
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-screen-2xl px-7 pb-24 sm:px-10 lg:mx-auto lg:px-16 lg:pb-28"
        style={{
          y: reduce ? '0%' : contentY,
          opacity: reduce ? 1 : contentO,
        }}
      >
        <motion.div
          className="mb-7 flex items-center gap-4"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        >
          <span
            className="h-px w-14"
            style={{ background: 'linear-gradient(90deg, #c9a85c, transparent)' }}
          />
          <span className="text-[10px] uppercase tracking-[0.38em] text-gold-bright/85">
            {label}
          </span>
        </motion.div>

        <h1
          className="font-jp max-w-4xl font-extrabold leading-[1.15] text-washi"
          style={{ fontSize: 'clamp(2.4rem, 5.6vw, 4.4rem)' }}
        >
          <Chars text={title} delay={0.65} reduce={reduce} />
        </h1>

        {subtitle && (
          <motion.p
            className="mt-6 max-w-xl text-sm font-light leading-loose text-washi/60"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.span
          className="mt-9 block h-px w-32"
          style={{ background: 'linear-gradient(90deg, #c9a85c, transparent)' }}
          initial={reduce ? false : { scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.45, ease: EASE }}
        />
      </motion.div>

      <Grain opacity={0.03} />
    </section>
  );
}

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { MARKETS } from '@/data/markets';
import { jaOutbound, JA_PROXY_NOTICE } from '@/lib/translate';

type Lang = 'ja' | 'en';

const FADE = 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)';

export function AssetMarquee() {
  const locale = useLocale() as Lang;
  const ja = locale === 'ja';
  const reduce = useReducedMotion() ?? false;
  const display = ja ? 'font-jp' : 'font-sans';
  // two copies so a −50% shift loops seamlessly
  const track = [...MARKETS, ...MARKETS];

  return (
    <div className="flex flex-col gap-3.5">
      <span className="text-[12px] uppercase tracking-[0.3em] text-sumi-soft/60">
        {locale === 'ja' ? '対応マーケット — Equiti & AIX' : 'Markets we cover — Equiti & AIX'}
      </span>
      <div className="relative overflow-hidden" style={{ maskImage: FADE, WebkitMaskImage: FADE }}>
        <motion.div
          className="flex w-max gap-3"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
        >
          {track.map(({ icon: Icon, en, ja: jaLabel, key, url }, i) => (
            <a
              key={`${key}-${i}`}
              href={jaOutbound(url, ja)}
              target="_blank"
              rel="noopener noreferrer"
              title={ja ? JA_PROXY_NOTICE : undefined}
              className="flex shrink-0 items-center gap-2.5 rounded-xl border border-sumi/10 bg-washi/75 px-5 py-3 backdrop-blur-sm transition-colors duration-300 hover:border-gold/40 hover:bg-washi"
            >
              <Icon className="h-4 w-4 text-gold" strokeWidth={1.6} />
              <span className={`${display} whitespace-nowrap text-sm font-medium text-sumi`}>
                {ja ? jaLabel : en}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

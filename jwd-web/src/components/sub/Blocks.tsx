'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { CountUp } from '@/components/kintsugi/CountUp';
import { Grain } from '@/components/kintsugi/Grain';
import type { Block, L, Tone } from '@/content/types';

const EASE = [0.16, 1, 0.3, 1] as const;
type Lang = 'ja' | 'en';

/* ── Tone palette: keeps the homepage two-worlds light/dark rhythm ── */
function toneClasses(tone: Tone = 'light') {
  switch (tone) {
    case 'dark':
      return {
        section: 'bg-night text-washi',
        kicker: 'text-gold-bright/75',
        heading: 'text-washi',
        body: 'text-washi/55',
        rule: 'linear-gradient(90deg, #c9a85c, transparent)',
        cardBorder: 'border-gold-bright/15',
        cardHover: 'hover:border-gold-bright/45',
        num: 'text-gold-bright/60',
        grain: true,
      };
    case 'deep':
      return {
        section: 'bg-washi-deep text-sumi',
        kicker: 'text-gold',
        heading: 'text-sumi',
        body: 'text-sumi-soft',
        rule: 'linear-gradient(90deg, #9a7b2d, transparent)',
        cardBorder: 'border-sumi/8',
        cardHover: 'hover:border-gold/40',
        num: 'text-gold/60',
        grain: false,
      };
    default:
      return {
        section: 'bg-washi text-sumi',
        kicker: 'text-gold',
        heading: 'text-sumi',
        body: 'text-sumi-soft',
        rule: 'linear-gradient(90deg, #9a7b2d, transparent)',
        cardBorder: 'border-sumi/8',
        cardHover: 'hover:border-gold/40',
        num: 'text-gold/60',
        grain: false,
      };
  }
}

function Shell({
  tone,
  children,
  tight,
}: {
  tone?: Tone;
  children: React.ReactNode;
  tight?: boolean;
}) {
  const c = toneClasses(tone);
  return (
    <section
      className={`relative overflow-hidden ${c.section} ${tight ? 'py-16 lg:py-20' : 'py-24 lg:py-32'}`}
    >
      {c.grain && <Grain opacity={0.03} />}
      <div className="relative mx-auto max-w-screen-xl px-7 lg:px-12">
        {children}
      </div>
    </section>
  );
}

function Header({
  tone,
  kicker,
  heading,
  tx,
}: {
  tone?: Tone;
  kicker?: L;
  heading?: L;
  tx: (l: L) => string;
}) {
  const c = toneClasses(tone);
  if (!kicker && !heading) return null;
  return (
    <Reveal className="mb-12 flex flex-col gap-5">
      {kicker && (
        <span className={`text-[10px] uppercase tracking-[0.38em] ${c.kicker}`}>
          {tx(kicker)}
        </span>
      )}
      {heading && (
        <h2
          className={`font-jp text-3xl font-extrabold leading-snug ${c.heading} lg:text-[2.4rem]`}
        >
          {tx(heading)}
        </h2>
      )}
    </Reveal>
  );
}

/* ── Per-block renderers ── */

function StatsBlock({
  block,
  tx,
}: {
  block: Extract<Block, { kind: 'stats' }>;
  tx: (l: L) => string;
}) {
  const c = toneClasses(block.tone);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <Shell tone={block.tone}>
      <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} />
      <div
        ref={ref}
        className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
      >
        {block.items.map((s, i) => (
          <motion.div
            key={i}
            className="border-t pt-6"
            style={{ borderColor: 'rgba(154,123,45,0.25)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
          >
            <div className={`font-en text-4xl font-light lg:text-5xl ${c.heading}`}>
              <CountUp
                to={s.value}
                decimals={s.decimals ?? 0}
                start={inView}
                prefix={s.prefix ?? ''}
                suffix={s.suffix ?? ''}
              />
            </div>
            <div className={`mt-3 text-[0.7rem] uppercase tracking-[0.18em] ${c.body}`}>
              {tx(s.label)}
            </div>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

function FaqItem({
  q,
  a,
  tone,
  tx,
}: {
  q: L;
  a: L;
  tone?: Tone;
  tx: (l: L) => string;
}) {
  const c = toneClasses(tone);
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b ${c.cardBorder}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className={`font-jp text-base font-bold lg:text-lg ${c.heading}`}>
          {tx(q)}
        </span>
        <span
          className={`relative h-4 w-4 shrink-0 ${c.kicker}`}
          aria-hidden
        >
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span
            className={`absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-500 ${open ? 'scale-y-0' : 'scale-y-100'}`}
          />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <p className={`pb-6 pr-10 text-sm font-light leading-[2] ${c.body}`}>
              {tx(a)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BlockView({
  block,
  tx,
}: {
  block: Block;
  tx: (l: L) => string;
}) {
  const c = toneClasses(block.tone);

  switch (block.kind) {
    case 'lead':
      return (
        <Shell tone={block.tone}>
          <Reveal>
            <p
              className={`max-w-4xl font-jp text-xl font-light leading-[1.95] ${c.heading} lg:text-[1.6rem]`}
            >
              {tx(block.text)}
            </p>
            <span
              className="mt-10 block h-px w-32"
              style={{ background: c.rule }}
            />
          </Reveal>
        </Shell>
      );

    case 'prose':
      return (
        <Shell tone={block.tone}>
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <div>
              <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} />
            </div>
            <div className="flex flex-col gap-7">
              {block.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <p className={`text-[0.95rem] font-light leading-[2.2] ${c.body}`}>
                    {tx(p)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Shell>
      );

    case 'stats':
      return <StatsBlock block={block} tx={tx} />;

    case 'points':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} />
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {block.items.map((it, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <article className={`group relative border-t pt-8 ${c.cardBorder}`}>
                  <span className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                  {block.numbered && (
                    <span className={`font-mono text-xs ${c.num}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  )}
                  <h3 className={`font-jp mt-4 text-xl font-bold ${c.heading}`}>
                    {tx(it.title)}
                  </h3>
                  <p className={`mt-5 text-[0.84rem] font-light leading-[2.1] ${c.body}`}>
                    {tx(it.text)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Shell>
      );

    case 'cards':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} />
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {block.items.map((it, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <article
                  className={`flex h-full flex-col gap-4 border p-8 transition-colors duration-500 ${c.cardBorder} ${c.cardHover}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className={`font-en text-xl font-semibold tracking-wide ${c.heading}`}>
                      {tx(it.title)}
                    </h3>
                    {it.meta && (
                      <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${c.kicker}`}>
                        {tx(it.meta)}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm font-light leading-[1.95] ${c.body}`}>
                    {tx(it.text)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Shell>
      );

    case 'steps':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} />
          <div className="grid gap-px overflow-hidden lg:grid-cols-4">
            {block.items.map((it, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`h-full border-t pt-7 lg:pr-7 ${c.cardBorder}`}>
                  <span className={`font-mono text-[10px] ${c.num}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={`font-jp mt-4 text-base font-bold ${c.heading}`}>
                    {tx(it.title)}
                  </h3>
                  <p className={`mt-3 text-[0.82rem] font-light leading-[1.95] ${c.body}`}>
                    {tx(it.text)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      );

    case 'quote':
      return (
        <Shell tone={block.tone}>
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className={`font-en text-6xl leading-none ${c.kicker}`}>“</span>
            <p className={`font-jp mt-2 text-2xl font-light leading-[1.7] ${c.heading} lg:text-[2rem]`}>
              {tx(block.text)}
            </p>
            {(block.by || block.role) && (
              <div className="mt-8 flex flex-col items-center gap-1">
                <span
                  className="mb-4 h-px w-12"
                  style={{ background: c.rule }}
                />
                {block.by && (
                  <span className={`font-en text-sm tracking-wide ${c.heading}`}>
                    {tx(block.by)}
                  </span>
                )}
                {block.role && (
                  <span className={`text-[10px] uppercase tracking-[0.24em] ${c.body}`}>
                    {tx(block.role)}
                  </span>
                )}
              </div>
            )}
          </Reveal>
        </Shell>
      );

    case 'callout':
      return (
        <Shell tone={block.tone} tight>
          <Reveal>
            <div className={`flex flex-col gap-4 border-l-2 pl-7 lg:pl-10`} style={{ borderColor: '#9a7b2d' }}>
              <h3 className={`font-jp text-lg font-bold ${c.heading}`}>
                {tx(block.title)}
              </h3>
              <p className={`max-w-3xl text-sm font-light leading-[2] ${c.body}`}>
                {tx(block.text)}
              </p>
            </div>
          </Reveal>
        </Shell>
      );

    case 'links':
      return (
        <Shell tone={block.tone} tight>
          <Reveal className="flex flex-col gap-6">
            {block.heading && (
              <span className={`text-[10px] uppercase tracking-[0.38em] ${c.kicker}`}>
                {tx(block.heading)}
              </span>
            )}
            {block.note && (
              <p className={`max-w-xl text-sm font-light leading-loose ${c.body}`}>
                {tx(block.note)}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              {block.items.map((it, i) => {
                const external = it.url.startsWith('http');
                const label = tx(it.label);
                const cls =
                  i === 0
                    ? 'bg-sumi px-8 py-4 text-xs uppercase tracking-[0.22em] text-washi transition-colors duration-500 hover:bg-gold'
                    : 'border border-gold/40 px-8 py-4 text-xs uppercase tracking-[0.22em] text-gold transition-all duration-500 hover:border-gold hover:bg-gold/10';
                return external ? (
                  <a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className={cls}>
                    {label}
                  </a>
                ) : (
                  <Link key={i} href={it.url} className={cls}>
                    {label}
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </Shell>
      );

    case 'faq':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} />
          <div className="mx-auto max-w-3xl">
            {block.items.map((it, i) => (
              <FaqItem key={i} q={it.q} a={it.a} tone={block.tone} tx={tx} />
            ))}
          </div>
        </Shell>
      );

    case 'gallery':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} />
          <div className="grid gap-6 md:grid-cols-3">
            {block.items.map((it, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden border border-gold-bright/15">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(135deg, #0e1830 0%, #1a2336 60%, #3a2f25 100%)',
                    }}
                  />
                  {/* play glyph */}
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold-bright/50 transition-transform duration-500 group-hover:scale-110">
                    <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-gold-bright" />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="font-jp text-sm font-bold text-washi">{tx(it.title)}</div>
                    <div className="mt-1 text-[11px] font-light text-washi/55">{tx(it.meta)}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      );

    default:
      return null;
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  return (
    <>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} tx={tx} />
      ))}
    </>
  );
}

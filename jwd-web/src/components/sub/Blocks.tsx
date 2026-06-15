'use client';

import { createContext, useContext, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import {
  Percent, ShieldCheck, TrendingUp, Landmark, Globe2, Building2,
  FileText, Coins, Users, KeyRound, Ship, Home, Scale, Gift,
  MapPin, Waves, Sparkles, Briefcase, Banknote, Sprout, Wallet,
  Award, Check, ArrowUpRight,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/kintsugi/Reveal';
import { StatsRow } from '@/components/sub/StatsRow';
import { BarChart, LineChart, DonutChart } from '@/components/sub/Charts';
import { Tabs, YieldCalculator, Compare } from '@/components/sub/Interactive';
import { Motif } from '@/components/sub/Motif';
import { MarkerUnderline } from '@/components/sub/MarkerUnderline';
import { Grain } from '@/components/kintsugi/Grain';
import { DEFAULT_THEME, type SectionTheme } from '@/content/themes';
import type { Block, L, Tone, IconKey } from '@/content/types';

const EASE = [0.16, 1, 0.3, 1] as const;
type Lang = 'ja' | 'en';

/* ── Section theme is shared by context so every Shell can paint its motif ── */
const ThemeCtx = createContext<{ theme: SectionTheme; idx: number }>({ theme: DEFAULT_THEME, idx: 0 });
const useBlockTheme = () => useContext(ThemeCtx);
/** the accent that stays legible on the current surface */
function accFor(theme: SectionTheme, tone?: Tone) {
  return tone === 'dark' ? theme.accentBright : theme.accent;
}

const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  percent: Percent, shield: ShieldCheck, trending: TrendingUp, bank: Landmark,
  globe: Globe2, building: Building2, doc: FileText, coins: Coins, users: Users,
  key: KeyRound, ship: Ship, home: Home, scale: Scale, gift: Gift, map: MapPin,
  waves: Waves, sparkles: Sparkles, briefcase: Briefcase, money: Banknote,
  sprout: Sprout, wallet: Wallet, award: Award,
};

function Icon({ name, className }: { name?: IconKey; className?: string }) {
  if (!name || !ICONS[name]) return null;
  const C = ICONS[name];
  return <C className={className} strokeWidth={1.4} />;
}

/* ── Tone palette (surface + text only; accents come from the theme) ── */
function toneClasses(tone: Tone = 'light') {
  switch (tone) {
    case 'dark':
      return { section: 'bg-sumi text-washi', heading: 'text-washi', body: 'text-washi/60', cardBorder: 'border-white/10', cardBg: 'bg-white/[0.03]', grain: true };
    case 'deep':
      return { section: 'bg-washi-deep text-sumi', heading: 'text-sumi', body: 'text-sumi-soft', cardBorder: 'border-sumi/8', cardBg: 'bg-washi', grain: false };
    default:
      return { section: 'bg-washi text-sumi', heading: 'text-sumi', body: 'text-sumi-soft', cardBorder: 'border-sumi/8', cardBg: 'bg-washi-deep/40', grain: false };
  }
}

const MOTIF_PLACE = [
  'right-[-7%] top-[-14%] h-[28rem] w-[28rem]',
  'left-[-9%] bottom-[-16%] h-[32rem] w-[32rem] -scale-x-100',
  'right-[-9%] bottom-[-14%] h-[26rem] w-[26rem] rotate-90',
  'left-[-7%] top-[-12%] h-[24rem] w-[24rem] -rotate-12',
];

function Shell({ tone, children, tight }: { tone?: Tone; children: React.ReactNode; tight?: boolean }) {
  const c = toneClasses(tone);
  const { theme, idx } = useBlockTheme();
  const dark = tone === 'dark';
  const acc = accFor(theme, tone);
  const place = MOTIF_PLACE[idx % MOTIF_PLACE.length];
  return (
    <section className={`relative overflow-hidden ${c.section} ${tight ? 'py-20 lg:py-28' : 'py-28 lg:py-40'}`}>
      {c.grain && <Grain opacity={0.03} />}
      <Motif motif={theme.motif} accent={acc} className={`absolute ${place}`} opacity={dark ? 0.09 : 0.05} />
      <div className="relative mx-auto max-w-screen-xl px-7 lg:px-12">{children}</div>
    </section>
  );
}

function Header({ tone, kicker, heading, tx, display }: { tone?: Tone; kicker?: L; heading?: L; tx: (l: L) => string; display: string }) {
  const c = toneClasses(tone);
  const { theme } = useBlockTheme();
  if (!kicker && !heading) return null;
  return (
    <Reveal className="mb-14 flex flex-col gap-5">
      {kicker && <span className="text-[10px] uppercase tracking-[0.38em]" style={{ color: accFor(theme, tone) }}>{tx(kicker)}</span>}
      {heading && (
        <div className="flex flex-col gap-3.5">
          <h2 className={`${display} max-w-3xl text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] ${c.heading} lg:text-[3rem]`}>{tx(heading)}</h2>
          <MarkerUnderline accent={accFor(theme, tone)} className="w-44 lg:w-64" />
        </div>
      )}
    </Reveal>
  );
}

function FaqItem({ q, a, tone, tx, display }: { q: L; a: L; tone?: Tone; tx: (l: L) => string; display: string }) {
  const c = toneClasses(tone);
  const { theme } = useBlockTheme();
  const acc = accFor(theme, tone);
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b ${c.cardBorder}`}>
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={open}>
        <span className={`${display} text-base font-medium lg:text-lg ${c.heading}`}>{tx(q)}</span>
        <span className="relative h-4 w-4 shrink-0" style={{ color: acc }} aria-hidden>
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className={`absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-500 ${open ? 'scale-y-0' : 'scale-y-100'}`} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
            <p className={`pb-6 pr-10 text-sm font-light leading-[2] ${c.body}`}>{tx(a)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PillLinks({ items, tx }: { items: { label: L; url: string }[]; tx: (l: L) => string }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {items.map((it, i) => {
        const external = it.url.startsWith('http');
        const label = tx(it.label);
        const cls = i === 0
          ? 'group inline-flex items-center gap-2 rounded-full bg-sumi px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-washi transition-colors duration-300 hover:bg-gold'
          : 'group inline-flex items-center gap-2 rounded-full border border-sumi/15 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-sumi transition-colors duration-300 hover:border-gold hover:text-gold';
        const inner = (<>{label}{external && <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />}</>);
        return external
          ? <a key={i} href={it.url} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
          : <Link key={i} href={it.url} className={cls}>{inner}</Link>;
      })}
    </div>
  );
}

function BlockView({ block, tx, display }: { block: Block; tx: (l: L) => string; display: string }) {
  const c = toneClasses(block.tone);
  const { theme } = useBlockTheme();
  const dark = block.tone === 'dark';
  const acc = accFor(theme, block.tone);
  const isEn = display === 'font-sans';
  const rule = `linear-gradient(90deg, ${acc}, transparent)`;

  switch (block.kind) {
    case 'lead':
      return (
        <Shell tone={block.tone}>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
              <p className={`${display} max-w-3xl text-2xl font-light leading-[1.5] ${c.heading} lg:text-[2.15rem]`}>{tx(block.text)}</p>
              {block.sidenote && <p className={`max-w-xs border-l-2 pl-5 text-sm font-light leading-relaxed ${c.body}`} style={{ borderColor: acc }}>{tx(block.sidenote)}</p>}
            </div>
            <span className="mt-10 block h-px w-28 origin-left" style={{ background: rule }} />
          </Reveal>
        </Shell>
      );

    case 'prose':
      return (
        <Shell tone={block.tone}>
          <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
            <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
            <div className="flex max-w-[42rem] flex-col gap-7">
              {block.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <p
                    className={`text-[1.05rem] font-light leading-[2.05] ${c.body} ${i === 0 && isEn ? 'first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:font-en first-letter:text-[3.6rem] first-letter:font-medium first-letter:leading-[0.7] first-letter:text-[color:var(--dc)]' : ''}`}
                    style={i === 0 && isEn ? ({ ['--dc']: acc } as React.CSSProperties) : undefined}
                  >
                    {tx(p)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Shell>
      );

    case 'split':
      return (
        <Shell tone={block.tone}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className={block.reverse ? 'lg:order-2' : ''}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-sumi/8 shadow-[0_30px_60px_-30px_rgba(32,37,31,0.35)]">
                <Image src={block.image} alt={block.imageAlt ? tx(block.imageAlt) : ''} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, transparent 58%, ${theme.accentSoft})` }} />
              </div>
              {block.imageAlt && (
                <p className={`mt-3.5 flex items-center gap-2 pl-1 text-[11px] italic ${c.body}`}>
                  <span className="h-px w-5" style={{ background: acc }} />
                  {tx(block.imageAlt)}
                </p>
              )}
            </Reveal>
            <div className={block.reverse ? 'lg:order-1' : ''}>
              <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
              <div className="flex flex-col gap-5">
                {block.body.map((p, i) => <Reveal key={i} delay={0.1 + i * 0.1}><p className={`text-[0.95rem] font-light leading-[1.95] ${c.body}`}>{tx(p)}</p></Reveal>)}
                {block.bullets && (
                  <Reveal delay={0.3} className="mt-2 flex flex-col gap-3">
                    {block.bullets.map((b, i) => (
                      <span key={i} className={`flex items-start gap-3 text-sm font-light ${c.body}`}>
                        <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} style={{ color: acc }} />{tx(b)}
                      </span>
                    ))}
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </Shell>
      );

    case 'stats':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
          <StatsRow items={block.items} tx={tx} dark={dark} accent={acc} />
        </Shell>
      );

    case 'chart': {
      const ch = block.chart;
      return (
        <Shell tone={block.tone}>
          <div className="grid gap-12 lg:grid-cols-[4fr_6fr] lg:gap-16">
            <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
            <Reveal>
              {ch.type === 'bars' && <BarChart items={ch.items.map((d) => ({ label: tx(d.label), value: d.value, highlight: d.highlight }))} unit={ch.unit} dark={dark} accent={acc} />}
              {ch.type === 'line' && <LineChart points={ch.points.map((d) => ({ label: tx(d.label), value: d.value }))} unit={ch.unit} dark={dark} accent={acc} />}
              {ch.type === 'donut' && <DonutChart items={ch.items.map((d) => ({ label: tx(d.label), value: d.value }))} dark={dark} accent={acc} />}
              {block.note && <p className={`mt-7 text-xs font-light italic ${c.body}`}>{tx(block.note)}</p>}
            </Reveal>
          </div>
        </Shell>
      );
    }

    case 'points':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((it, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.article
                  className="flex flex-col gap-5"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  {it.icon ? (
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                      style={{ background: `linear-gradient(140deg, ${acc}, ${theme.accentBright})`, boxShadow: `0 10px 24px -10px ${acc}` }}
                    >
                      <Icon name={it.icon} className="h-5 w-5" />
                    </span>
                  ) : block.numbered ? (
                    <span className="font-en text-3xl font-light leading-none" style={{ color: acc }}>{String(i + 1).padStart(2, '0')}</span>
                  ) : null}
                  <h3 className={`${display} text-xl font-semibold ${c.heading}`}>{tx(it.title)}</h3>
                  <p className={`text-[0.9rem] font-light leading-[1.95] ${c.body}`}>{tx(it.text)}</p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Shell>
      );

    case 'cards':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {block.items.map((it, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <motion.article
                  className="group relative h-full"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  {/* glow */}
                  <div
                    className="pointer-events-none absolute -inset-3 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                    style={{ background: `radial-gradient(60% 70% at 50% 0%, ${acc}40, transparent 70%)` }}
                  />
                  {/* gradient border */}
                  <div
                    className="relative h-full rounded-2xl p-px transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-28px_rgba(32,37,31,0.4)]"
                    style={{ background: `linear-gradient(150deg, ${acc}66, ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(32,37,31,0.06)'} 55%)` }}
                  >
                    <div className={`flex h-full flex-col gap-5 rounded-2xl ${dark ? 'bg-sumi' : 'bg-washi'} p-8`}>
                      <div className="flex items-center justify-between gap-4">
                        {it.icon ? (
                          <span
                            className="flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                            style={{ background: `linear-gradient(140deg, ${acc}, ${theme.accentBright})`, boxShadow: `0 10px 24px -10px ${acc}` }}
                          >
                            <Icon name={it.icon} className="h-5 w-5" />
                          </span>
                        ) : (
                          <span className="h-px w-8" style={{ background: acc }} />
                        )}
                        {it.meta && <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: acc }}>{tx(it.meta)}</span>}
                      </div>
                      <h3 className={`${display} text-xl font-semibold ${c.heading}`}>{tx(it.title)}</h3>
                      <p className={`text-sm font-light leading-[1.9] ${c.body}`}>{tx(it.text)}</p>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </Shell>
      );

    case 'steps':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {block.items.map((it, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`relative border-t pt-7 ${c.cardBorder}`}>
                  <span className="font-mono text-[10px]" style={{ color: acc, opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={`${display} mt-4 text-base font-semibold ${c.heading}`}>{tx(it.title)}</h3>
                  <p className={`mt-3 text-[0.84rem] font-light leading-[1.9] ${c.body}`}>{tx(it.text)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      );

    case 'quote':
      return (
        <Shell tone={block.tone}>
          <Reveal className="mx-auto max-w-4xl text-center">
            <span className="font-en text-7xl leading-none" style={{ color: acc }}>“</span>
            <p className={`${display} mt-3 text-[1.7rem] font-light leading-[1.4] ${c.heading} lg:text-[2.6rem]`}>{tx(block.text)}</p>
            {(block.by || block.role) && (
              <div className="mt-8 flex flex-col items-center gap-1">
                <span className="mb-4 h-px w-12" style={{ background: rule }} />
                {block.by && <span className="font-en text-sm tracking-wide">{tx(block.by)}</span>}
                {block.role && <span className={`text-[10px] uppercase tracking-[0.24em] ${c.body}`}>{tx(block.role)}</span>}
              </div>
            )}
          </Reveal>
        </Shell>
      );

    case 'testimonial':
      return (
        <Shell tone={block.tone}>
          <Reveal>
            <div className={`mx-auto grid max-w-4xl gap-8 rounded-3xl border ${c.cardBorder} ${c.cardBg} p-10 lg:grid-cols-[2fr_1fr] lg:items-center lg:p-14`}>
              <div>
                <p className={`${display} text-xl font-light leading-[1.6] ${c.heading} lg:text-2xl`}>“{tx(block.quote)}”</p>
                <div className="mt-7 flex flex-col">
                  <span className="font-en text-sm tracking-wide">{tx(block.name)}</span>
                  <span className={`text-[11px] uppercase tracking-[0.2em] ${c.body}`}>{tx(block.role)}</span>
                </div>
              </div>
              {block.result && (
                <div className="flex flex-col items-start gap-2 border-t pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" style={{ borderColor: theme.accentSoft }}>
                  <span className={`font-en text-4xl font-light ${c.heading}`} style={{ color: acc }}>{tx(block.result).split(' ')[0]}</span>
                  <span className={`text-[11px] uppercase tracking-[0.16em] ${c.body}`}>{tx(block.result).split(' ').slice(1).join(' ')}</span>
                </div>
              )}
            </div>
          </Reveal>
        </Shell>
      );

    case 'callout':
      return (
        <Shell tone={block.tone} tight>
          <Reveal>
            <div className="flex flex-col gap-4 border-l-2 pl-7 lg:pl-10" style={{ borderColor: acc }}>
              <h3 className={`${display} text-lg font-semibold ${c.heading}`}>{tx(block.title)}</h3>
              <p className={`max-w-3xl text-sm font-light leading-[2] ${c.body}`}>{tx(block.text)}</p>
            </div>
          </Reveal>
        </Shell>
      );

    case 'links':
      return (
        <Shell tone={block.tone} tight>
          <Reveal className="flex flex-col gap-6">
            {block.heading && <span className="text-[10px] uppercase tracking-[0.38em]" style={{ color: acc }}>{tx(block.heading)}</span>}
            {block.note && <p className={`max-w-xl text-sm font-light leading-loose ${c.body}`}>{tx(block.note)}</p>}
            <PillLinks items={block.items} tx={tx} />
          </Reveal>
        </Shell>
      );

    case 'tabs':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
          <Reveal>
            <Tabs
              accent={acc}
              dark={dark}
              display={display}
              items={block.items.map((it) => ({
                tab: tx(it.tab),
                title: tx(it.title),
                text: tx(it.text),
                bullets: it.bullets?.map(tx),
                metric: it.metric ? { value: it.metric.value, label: tx(it.metric.label) } : undefined,
              }))}
            />
          </Reveal>
        </Shell>
      );

    case 'calculator':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
          <Reveal>
            <YieldCalculator accent={acc} dark={dark} ja={!isEn} />
            {block.note && <p className={`mt-6 text-xs font-light italic ${c.body}`}>{tx(block.note)}</p>}
          </Reveal>
        </Shell>
      );

    case 'compare':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
          <Reveal>
            <Compare
              accent={acc}
              dark={dark}
              display={display}
              left={tx(block.left)}
              right={tx(block.right)}
              rows={block.rows.map((r) => ({ label: tx(r.label), left: tx(r.left), right: tx(r.right) }))}
            />
          </Reveal>
        </Shell>
      );

    case 'faq':
      return (
        <Shell tone={block.tone}>
          <Header tone={block.tone} kicker={block.kicker} heading={block.heading} tx={tx} display={display} />
          <div className="mx-auto max-w-3xl">
            {block.items.map((it, i) => <FaqItem key={i} q={it.q} a={it.a} tone={block.tone} tx={tx} display={display} />)}
          </div>
        </Shell>
      );

    default:
      return null;
  }
}

export function Blocks({ blocks, theme = DEFAULT_THEME }: { blocks: Block[]; theme?: SectionTheme }) {
  const locale = useLocale() as Lang;
  const tx = (l: L) => l[locale] ?? l.en;
  const display = locale === 'ja' ? 'font-jp' : 'font-sans';
  return (
    <>
      {blocks.map((block, i) => (
        <ThemeCtx.Provider key={i} value={{ theme, idx: i }}>
          <BlockView block={block} tx={tx} display={display} />
        </ThemeCtx.Provider>
      ))}
    </>
  );
}

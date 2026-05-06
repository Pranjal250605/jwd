import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ServicePageData } from '../data/servicePages';
import { Hero } from './Hero';

// ─── Images ───────────────────────────────────────────────────────────────────
// All Pexels CDN URLs serve directly without authentication (confirmed reliable).
// penOnPaper stays on AIDA CDN which is also confirmed working.
const IMG = {
  // Pen on paper — document signing / legal contracts (AIDA CDN, confirmed)
  penOnPaper:    'https://lh3.googleusercontent.com/aida-public/AB6AXuB1roq9jzq0EOiHfhFg8nPDbCN-wWZQhMT07h6sDdjd1ha9RHncGGJNmpz7mh35PzEmTnHO7ZEtxTYIbVaDiy8DXygztPg-w9vQ-9Ojrunti_4QbEWeY-GQP-Zf1MjId1_RRwqCOC7liYEd5NbU1fCX-nvm86kCRND5SpF6YfUwUyuEt9rS1IcLqtE966NTMxB8URmZnwe6-6w9DzCY12gFrmlsSNtgFbnsy-nKFTsh8K62P4ZlepGaiDmlwR30wCcaYlZe0Cl76R0k',
  // Dubai illuminated skyline at night — company formation, freezone market, UAE jurisdiction
  dubaiSkyline:  'https://images.pexels.com/photos/13256066/pexels-photo-13256066.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // Dubai aerial city lights — travel/visa destination, regional UAE presence
  dubaiAerial:   'https://images.pexels.com/photos/325193/pexels-photo-325193.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // Passport with travel documents — visa acquisition, Emirates ID identity context
  passport:      'https://images.pexels.com/photos/32060712/pexels-photo-32060712.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // Official approval stamp on agreement — license acquisition, audit certification
  businessStamp: 'https://images.pexels.com/photos/1389082/pexels-photo-1389082.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // Modern bank building facade at golden hour — corporate & personal banking
  bankInterior:  'https://images.pexels.com/photos/18274050/pexels-photo-18274050.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // Financial documents, spreadsheets and calculator — accounting audit review
  bankVault:     'https://images.pexels.com/photos/259257/pexels-photo-259257.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // Modern luxury office interior — private wealth banking, executive advisory
  luxuryLobby:   'https://images.pexels.com/photos/33342710/pexels-photo-33342710.jpeg?auto=compress&cs=tinysrgb&w=1600',
  // Tax forms with calculator on desk — FTA compliance, VAT/CT registration
  taxDocuments:  'https://images.pexels.com/photos/6863329/pexels-photo-6863329.jpeg?auto=compress&cs=tinysrgb&w=1600',
};

// ─── Theme palette ────────────────────────────────────────────────────────────
interface C {
  bg: string; alt: string; text: string; muted: string;
  primary: string; accent: string; cardBg: string; cardBorder: string;
  divider: string; quoteBar: string; imgFilter: string;
  heroBg: string; heroText: string; heroMuted: string;
}

const TC: Record<string, C> = {
  formal:    { bg: '#f0ebe2', alt: '#f7f4ed', text: '#2f342e', muted: '#7a7060', primary: '#00113a', accent: '#cca830', cardBg: 'rgba(0,17,58,0.04)', cardBorder: 'rgba(0,17,58,0.1)', divider: 'rgba(0,17,58,0.08)', quoteBar: '#cca830', imgFilter: 'brightness(0.88) sepia(0.15) saturate(0.9)', heroBg: '#00113a', heroText: '#f0ebe2', heroMuted: 'rgba(240,235,226,0.88)' },
  luxurious: { bg: '#0e0e0e', alt: '#161616', text: '#e0d8c8', muted: '#8b8070', primary: '#e9c176', accent: '#e9c176', cardBg: 'rgba(233,193,118,0.04)', cardBorder: 'rgba(233,193,118,0.12)', divider: 'rgba(233,193,118,0.08)', quoteBar: '#e9c176', imgFilter: 'brightness(0.62) hue-rotate(200deg) saturate(0.55)', heroBg: '#0a0a0a', heroText: '#e9c176', heroMuted: 'rgba(233,193,118,0.75)' },
  zen:       { bg: '#faf9f5', alt: '#f2ede4', text: '#2f342e', muted: '#787c75', primary: '#775a19', accent: '#775a19', cardBg: 'rgba(119,90,25,0.04)', cardBorder: 'rgba(119,90,25,0.12)', divider: 'rgba(119,90,25,0.1)', quoteBar: '#775a19', imgFilter: 'brightness(0.85) sepia(0.25) saturate(0.85)', heroBg: '#1a1f18', heroText: '#f5f0e6', heroMuted: 'rgba(245,240,230,0.82)' },
  sovereign: { bg: '#040d1e', alt: '#061025', text: '#c8d4e8', muted: '#4a6090', primary: '#d4af37', accent: '#d4af37', cardBg: 'rgba(212,175,55,0.04)', cardBorder: 'rgba(212,175,55,0.14)', divider: 'rgba(212,175,55,0.1)', quoteBar: '#d4af37', imgFilter: 'brightness(0.6) hue-rotate(220deg) saturate(0.5)', heroBg: '#040d1e', heroText: '#d4af37', heroMuted: 'rgba(212,175,55,0.72)' },
  pavilion:  { bg: '#0d0907', alt: '#140e06', text: '#d4c0a0', muted: '#8a7a6a', primary: '#c4862a', accent: '#c4862a', cardBg: 'rgba(196,134,42,0.05)', cardBorder: 'rgba(196,134,42,0.18)', divider: 'rgba(196,134,42,0.12)', quoteBar: '#c4862a', imgFilter: 'brightness(0.7) sepia(0.45) saturate(0.85)', heroBg: '#080604', heroText: '#c4862a', heroMuted: 'rgba(196,134,42,0.72)' },
};

// ═══════════════════════════════════════════════════════════════════════════
// SHARED LAYOUT PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════════

// Sticky two-column overview: image panel sticks while text scrolls past it
const StickyOverview = ({
  data, c, isFormal, img, statNum, statLabel, sideRight = false,
}: {
  data: ServicePageData; c: C; isFormal: boolean;
  img: string; statNum: string; statLabel: string; sideRight?: boolean;
}) => {
  const imgCol = (
    <div className="hidden lg:block" style={{ position: 'sticky', top: '6rem', height: '70vh' }}>
      <div className="relative w-full h-full overflow-hidden">
        <img src={img} alt="" className="w-full h-full object-cover"
          style={{ filter: c.imgFilter, transform: 'scale(1.03)' }} />
        {/* Gradient edge toward the text side */}
        <div className="absolute inset-0" style={{
          background: sideRight
            ? `linear-gradient(to left, ${c.bg} 0%, transparent 30%)`
            : `linear-gradient(to right, ${c.bg} 0%, transparent 30%)`
        }}></div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: `linear-gradient(to top, ${c.bg}, transparent)` }}></div>
        {/* Floating stat badge — always dark backdrop so text is readable regardless of theme */}
        <div className="absolute bottom-10 left-8 right-8 p-5"
          style={{ background: 'rgba(0,0,0,0.62)', backdropFilter: 'blur(20px)', border: `1px solid ${c.accent}44` }}>
          <div className="font-headline" style={{ fontWeight: isFormal ? 800 : 200, fontSize: '1.8rem', color: c.accent }}>{statNum}</div>
          <div className="font-label text-[9px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.82)' }}>{statLabel}</div>
        </div>
      </div>
    </div>
  );

  const textCol = (
    <div className="py-20 lg:py-32 space-y-7">
      <div className="flex items-center gap-4">
        <div className="w-8 h-[1px]" style={{ background: c.accent }}></div>
        <span className="font-label text-[10px] uppercase tracking-[0.4em]" style={{ color: c.accent }}>Overview</span>
      </div>
      {data.overview.map((para, i) => (
        <p key={i} className="font-sans leading-loose"
          style={{ fontSize: i === 0 ? '1.05rem' : '0.9rem', color: i === 0 ? c.text : c.muted, fontWeight: 300, opacity: i === 2 ? 0.8 : 1 }}>
          {para}
        </p>
      ))}
      {data.vision && (
        <div className="pt-4 flex gap-5 items-start">
          <div className="w-1 shrink-0 self-stretch mt-1" style={{ background: c.quoteBar }}></div>
          <p className="font-sans text-sm leading-loose" style={{ color: c.muted, fontStyle: 'italic' }}>
            "{data.vision}"
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {sideRight ? <>{textCol}{imgCol}</> : <>{imgCol}{textCol}</>}
      </div>
    </div>
  );
};

// Full-bleed image moment: a visual pause that breaks the content grid
const FullBleedMoment = ({
  img, c, quote, stat, statLabel, isFormal, gradientDir = 'left',
}: {
  img: string; c: C; quote?: string; stat?: string; statLabel?: string;
  isFormal: boolean; gradientDir?: 'left' | 'right' | 'bottom';
}) => {
  // Stronger gradients — text zone must be dark enough for white text on any image
  const gradients: Record<string, string> = {
    left:   `linear-gradient(to right, ${c.heroBg}ff 0%, ${c.heroBg}dd 35%, ${c.heroBg}55 65%, transparent 100%)`,
    right:  `linear-gradient(to left,  ${c.heroBg}ff 0%, ${c.heroBg}dd 35%, ${c.heroBg}55 65%, transparent 100%)`,
    bottom: `linear-gradient(to top,   ${c.heroBg}ff 0%, ${c.heroBg}cc 40%, transparent 100%)`,
  };
  return (
    <div className="relative overflow-hidden" style={{ height: '52vh', minHeight: '340px' }}>
      <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: c.imgFilter }} />
      <div className="absolute inset-0" style={{ background: gradients[gradientDir] }}></div>
      {/* Dark vignette along bottom edge — text always sits on dark */}
      <div className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)' }}></div>

      <div className="relative h-full flex items-end max-w-screen-2xl mx-auto px-10 lg:px-16 pb-14">
        <div className={gradientDir === 'right' ? 'ml-auto text-right' : ''}>
          {stat && (
            <div className="font-headline mb-1" style={{
              fontWeight: isFormal ? 800 : 200, fontSize: 'clamp(2.5rem,5vw,4rem)',
              color: c.accent, lineHeight: 1, letterSpacing: '-0.02em'
            }}>{stat}</div>
          )}
          {statLabel && (
            <div className="font-label text-[10px] uppercase tracking-[0.4em] mb-3"
              style={{ color: 'rgba(255,255,255,0.9)' }}>{statLabel}</div>
          )}
          {quote && (
            <p className="font-sans text-sm max-w-md leading-loose"
              style={{ color: 'rgba(255,255,255,0.78)', fontStyle: 'italic' }}>
              {quote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Bento focus grid: varied card sizes instead of uniform 4-equal grid
const BentoFocus = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => {
  const areas = data.focusAreas;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Card 0 — wide (spans 2 cols on lg) */}
      <div className="col-span-2 lg:col-span-2 p-8 flex flex-col justify-between"
        style={{ background: c.cardBg, border: `1px solid ${c.cardBorder}`, minHeight: '180px' }}>
        <div className="font-label text-[9px] uppercase tracking-[0.4em]" style={{ color: c.accent, opacity: 0.7 }}>01</div>
        <div>
          <div className="w-8 h-[1px] mb-4" style={{ background: c.accent, opacity: 0.5 }}></div>
          <h4 className="font-headline mb-3" style={{ fontWeight: isFormal ? 700 : 400, fontSize: '1rem', color: isFormal ? c.primary : c.text }}>
            {areas[0]?.title}
          </h4>
          <p className="font-sans text-sm leading-loose" style={{ color: c.muted }}>{areas[0]?.desc}</p>
        </div>
      </div>

      {/* Card 1 — accent bg, tall */}
      <div className="col-span-1 row-span-2 p-7 flex flex-col justify-between hidden lg:flex"
        style={{ background: `${c.accent}10`, border: `1px solid ${c.accent}30`, borderLeft: `3px solid ${c.accent}`, minHeight: '200px' }}>
        <div className="font-label text-[9px] uppercase tracking-[0.4em]" style={{ color: c.accent }}>02</div>
        <div>
          <h4 className="font-headline mb-3" style={{ fontWeight: isFormal ? 700 : 400, fontSize: '1rem', color: isFormal ? c.primary : c.accent }}>
            {areas[1]?.title}
          </h4>
          <p className="font-sans text-sm leading-loose" style={{ color: c.muted }}>{areas[1]?.desc}</p>
        </div>
      </div>

      {/* Card 1 fallback mobile */}
      <div className="col-span-1 p-7 lg:hidden" style={{ background: `${c.accent}10`, border: `1px solid ${c.accent}30`, borderLeft: `3px solid ${c.accent}` }}>
        <div className="font-label text-[9px] uppercase tracking-[0.4em] mb-3" style={{ color: c.accent }}>02</div>
        <h4 className="font-headline mb-2" style={{ fontWeight: isFormal ? 700 : 400, fontSize: '0.9rem', color: isFormal ? c.primary : c.accent }}>{areas[1]?.title}</h4>
        <p className="font-sans text-xs leading-loose" style={{ color: c.muted }}>{areas[1]?.desc}</p>
      </div>

      {/* Card 2 — small */}
      <div className="col-span-1 p-7" style={{ border: `1px solid ${c.cardBorder}`, background: c.cardBg }}>
        <div className="font-label text-[9px] uppercase tracking-[0.4em] mb-3" style={{ color: c.accent, opacity: 0.7 }}>03</div>
        <h4 className="font-headline mb-2" style={{ fontWeight: isFormal ? 700 : 400, fontSize: '0.9rem', color: isFormal ? c.primary : c.text }}>{areas[2]?.title}</h4>
        <p className="font-sans text-xs leading-loose" style={{ color: c.muted }}>{areas[2]?.desc}</p>
      </div>

      {/* Card 3 — wide bottom */}
      <div className="col-span-2 lg:col-span-2 p-8"
        style={{ border: `1px solid ${c.cardBorder}`, background: c.cardBg, borderTop: `2px solid ${c.accent}40` }}>
        <div className="font-label text-[9px] uppercase tracking-[0.4em] mb-3" style={{ color: c.accent, opacity: 0.7 }}>04</div>
        <div className="lg:flex gap-8 items-start">
          <h4 className="font-headline mb-2 lg:mb-0 shrink-0" style={{ fontWeight: isFormal ? 700 : 400, fontSize: '1rem', color: isFormal ? c.primary : c.text, minWidth: '220px' }}>
            {areas[3]?.title}
          </h4>
          <p className="font-sans text-sm leading-loose" style={{ color: c.muted }}>{areas[3]?.desc}</p>
        </div>
      </div>
    </div>
  );
};

// Open services list — less box-heavy, more editorial
const OpenServices = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <div className="space-y-10">
    {data.servicesOffered.map((cat, idx) => (
      <div key={idx}>
        <div className="flex items-center gap-4 mb-5">
          <span className="font-label text-[9px] uppercase tracking-[0.4em]" style={{ color: c.accent }}>
            {String(idx + 1).padStart(2, '0')}
          </span>
          <div className="h-[1px] flex-1" style={{ background: c.divider }}></div>
          <span className="font-headline text-sm" style={{ fontWeight: isFormal ? 700 : 400, color: isFormal ? c.primary : c.text, letterSpacing: '0.04em' }}>
            {cat.categoryTitle}
          </span>
        </div>
        <ul className="space-y-3 pl-8">
          {cat.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span style={{ color: c.accent, fontSize: '0.7rem', marginTop: '4px', flexShrink: 0 }}>◆</span>
              <span className="font-sans text-sm leading-relaxed" style={{ color: c.muted }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// Open FAQ — generous spacing, lines not boxes
const OpenFAQ = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <div className="space-y-0">
    {data.faq.map((faq, idx) => (
      <div key={idx} className="py-8" style={{ borderBottom: `1px solid ${c.divider}` }}>
        <div className="flex gap-4 items-start mb-3">
          <span className="font-headline shrink-0 mt-0.5" style={{ fontSize: '0.8rem', color: c.accent, fontWeight: isFormal ? 700 : 300 }}>Q</span>
          <h5 className="font-headline text-sm leading-snug" style={{ fontWeight: isFormal ? 700 : 500, color: isFormal ? c.primary : c.text, letterSpacing: '0.02em' }}>
            {faq.q}
          </h5>
        </div>
        <div className="flex gap-4 items-start">
          <span className="font-headline shrink-0 mt-0.5" style={{ fontSize: '0.8rem', color: c.muted, fontWeight: 300, opacity: 0.5 }}>A</span>
          <p className="font-sans text-sm leading-loose" style={{ color: c.muted }}>{faq.a}</p>
        </div>
      </div>
    ))}
  </div>
);


// ═══════════════════════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════════════════════
const CTASection = ({ c, isFormal }: { c: C; isFormal: boolean }) => (
  <section className="relative overflow-hidden" style={{ background: c.heroBg }}>
    {/* Ambient radial glow */}
    <div className="absolute inset-0 pointer-events-none" style={{
      background: `radial-gradient(ellipse 80% 60% at 50% 120%, ${c.accent}1c 0%, transparent 65%)`
    }} />
    {/* Top accent rule */}
    <div className="absolute top-0 left-0 right-0 h-[1px]" style={{
      background: `linear-gradient(90deg, transparent 0%, ${c.accent}77 25%, ${c.accent} 50%, ${c.accent}77 75%, transparent 100%)`
    }} />
    {/* Ghost FOJ watermark */}
    <div className="absolute right-0 inset-y-0 flex items-center pr-8 pointer-events-none select-none overflow-hidden">
      <span className="font-headline" style={{
        fontSize: 'clamp(9rem, 20vw, 18rem)', fontWeight: isFormal ? 800 : 100,
        color: c.accent, opacity: 0.045, letterSpacing: '-0.04em', lineHeight: 1,
      }}>FOJ</span>
    </div>

    <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-16 py-28 lg:py-40">
      <div className="max-w-3xl">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-[1px]" style={{ background: c.accent }} />
          <span className="font-label text-[10px] uppercase tracking-[0.5em]" style={{ color: c.accent }}>
            First Call Partner · 初回ご相談
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-headline mb-8" style={{
          fontWeight: isFormal ? 800 : 200,
          fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)',
          color: c.heroText,
          lineHeight: 1.06,
          letterSpacing: isFormal ? '-0.025em' : '0.04em',
        }}>
          ドバイ進出の<br />
          最初の一手を、<br />
          <span style={{ color: c.accent }}>共に。</span>
        </h2>

        {/* Body */}
        <p className="font-sans mb-3" style={{
          color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem',
          lineHeight: 1.95, maxWidth: '40rem', fontWeight: 300,
        }}>
          法人設立からライセンス取得・VISA・銀行口座開設まで、
          ドバイ進出に必要な全手続きをワンストップでサポートします。
        </p>
        <p className="font-sans mb-14" style={{
          color: 'rgba(255,255,255,0.38)', fontSize: '0.8rem', lineHeight: 1.8, fontWeight: 300,
        }}>
          当サービスは完全紹介制です。ご紹介者を通じてのみご相談を承ります。
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center gap-6 mb-20">
          <a
            href="mailto:info@familyofficejapan.com"
            style={{
              display: 'inline-block',
              background: c.accent,
              color: '#080808',
              fontWeight: 700,
              padding: '1rem 2.5rem',
              fontFamily: 'inherit',
              fontSize: '0.68rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.82'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            お問い合わせ
          </a>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.48)' }}>
              info@familyofficejapan.com
            </span>
            <span className="font-label text-[8px] uppercase tracking-widest" style={{ color: `${c.accent}80` }}>
              完全紹介制 · Referral Required
            </span>
          </div>
        </div>

        {/* Trust metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ borderTop: `1px solid ${c.accent}20` }}>
          {[
            { val: 'Est.', tag: '2020', label: 'ドバイ設立' },
            { val: '50+',  tag: '',     label: 'フリーゾーン対応' },
            { val: '8',    tag: '',     label: 'サービス領域' },
            { val: '100%', tag: '',     label: '外資完全所有' },
          ].map(({ val, tag, label }, i) => (
            <div key={i} className="pt-8 pr-6"
              style={{ borderRight: i < 3 ? `1px solid ${c.accent}18` : 'none', paddingLeft: i > 0 ? '1.5rem' : 0 }}>
              <div className="font-headline" style={{
                fontWeight: isFormal ? 800 : 200, fontSize: '1.55rem', color: c.accent, lineHeight: 1,
              }}>
                {val}
                {tag && <span className="ml-1 text-sm" style={{ opacity: 0.55 }}>{tag}</span>}
              </div>
              <div className="font-label text-[8px] uppercase tracking-[0.3em] mt-2"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                {label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>

    {/* Bottom fade to next section */}
    <div className="absolute bottom-0 left-0 right-0 h-[1px]"
      style={{ background: `linear-gradient(90deg, ${c.accent}44, transparent)` }} />
  </section>
);


// ═══════════════════════════════════════════════════════════════════════════
// HERO SECTIONS (unchanged from previous implementation)
// ═══════════════════════════════════════════════════════════════════════════

const HeroLicense = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <section className="relative overflow-hidden" style={{ minHeight: '72vh', background: c.heroBg }}>
    <div className="absolute inset-0 flex items-center justify-start pl-6 pointer-events-none select-none overflow-hidden">
      <span className="font-headline whitespace-nowrap"
        style={{ fontSize: 'clamp(7rem,15vw,13rem)', fontWeight: 800, color: c.accent, opacity: 0.05, letterSpacing: '-0.04em', lineHeight: 1 }}>
        LICENSE
      </span>
    </div>
    <div className="absolute top-0 right-0 bottom-0 w-[18%] hidden lg:block">
      <img src={IMG.penOnPaper} alt="" className="w-full h-full object-cover" style={{ filter: c.imgFilter }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${c.heroBg} 0%, transparent 40%)` }}></div>
    </div>
    <div className="relative z-10 max-w-screen-2xl mx-auto px-10 lg:px-16 flex flex-col justify-center" style={{ minHeight: '72vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-[1px]" style={{ background: c.accent }}></div>
          <span className="font-label text-[10px] uppercase tracking-[0.45em]" style={{ color: c.accent }}>Commercial &amp; Professional</span>
        </div>
        <h1 className="font-headline mb-6" style={{ fontWeight: isFormal ? 800 : 200, fontSize: 'clamp(2.8rem,5vw,4.2rem)', color: c.heroText, lineHeight: 1.0, letterSpacing: isFormal ? '-0.02em' : '0.06em' }}>
          {data.title}
        </h1>
        <p className="font-sans mb-10" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: c.heroMuted, fontWeight: 300, maxWidth: '34rem' }}>{data.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          {['Trading Licence', 'Professional Licence', 'Freezone Permit', 'Annual Renewal'].map(tag => (
            <span key={tag} className="font-label text-[9px] uppercase tracking-widest px-3 py-1.5"
              style={{ border: `1px solid ${c.accent}44`, color: c.accent, opacity: 0.75 }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, ${c.accent}66, transparent)` }}></div>
  </section>
);

const HeroVisa = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <section className="relative overflow-hidden" style={{ minHeight: '78vh' }}>
    <div className="absolute inset-0">
      <img src={IMG.passport} alt="" className="w-full h-full object-cover" style={{ filter: c.imgFilter, transform: 'scale(1.05)', objectPosition: 'center 35%' }} />
    </div>
    <div className="absolute inset-0" style={{ background: `linear-gradient(105deg, ${c.heroBg} 0%, ${c.heroBg}ee 35%, ${c.heroBg}88 60%, transparent 100%)` }}></div>
    <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: `linear-gradient(to top, ${c.heroBg}, transparent)` }}></div>
    <div className="absolute bottom-28 left-12 hidden lg:flex items-center gap-2">
      {[1, 0.5, 0.25].map((op, i) => (
        <React.Fragment key={i}>
          <div className="rounded-full" style={{ width: i === 0 ? '8px' : '5px', height: i === 0 ? '8px' : '5px', background: c.accent, opacity: op }}></div>
          {i < 2 && <div style={{ width: '24px', height: '1px', background: c.accent, opacity: 0.3 }}></div>}
        </React.Fragment>
      ))}
      <div className="font-label text-[9px] uppercase tracking-widest ml-2" style={{ color: c.accent, opacity: 0.5 }}>Abu Dhabi · Dubai · Sharjah</div>
    </div>
    <div className="relative z-10 max-w-screen-2xl mx-auto px-10 lg:px-16 flex flex-col justify-end" style={{ minHeight: '78vh', paddingBottom: '6rem', paddingTop: '8rem' }}>
      <div className="max-w-xl">
        <div className="font-label text-[10px] uppercase tracking-[0.45em] mb-5" style={{ color: c.accent }}>Residency &amp; Workforce Mobility</div>
        <h1 className="font-headline mb-5" style={{ fontWeight: isFormal ? 800 : 200, fontSize: 'clamp(2.8rem,5.5vw,4.5rem)', color: c.heroText, lineHeight: 1.0, letterSpacing: isFormal ? '-0.02em' : '0.04em' }}>
          {data.title}
        </h1>
        <p className="font-sans mb-8" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: c.heroMuted, fontWeight: 300 }}>{data.subtitle}</p>
        <div className="inline-flex items-center gap-3 px-5 py-3" style={{ border: `1px solid ${c.accent}55`, background: `${c.accent}0a` }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.accent }}></div>
          <span className="font-label text-[10px] uppercase tracking-widest" style={{ color: c.accent }}>Golden Visa 対応 · 10年長期居住</span>
        </div>
      </div>
    </div>
  </section>
);

const HeroEmiratesId = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <section className="relative overflow-hidden" style={{ minHeight: '70vh', background: c.heroBg }}>
    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${c.accent}08 1px, transparent 1px), linear-gradient(90deg, ${c.accent}08 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>
    <div className="relative z-10 max-w-screen-2xl mx-auto px-10 lg:px-16 flex items-center" style={{ minHeight: '70vh', paddingTop: '7rem' }}>
      <div className="w-full grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="font-label text-[10px] uppercase tracking-[0.45em] mb-6" style={{ color: c.accent }}>National Identity · Digital Integration</div>
          <h1 className="font-headline mb-6" style={{ fontWeight: isFormal ? 800 : 200, fontSize: 'clamp(2.6rem,4.5vw,4rem)', color: c.heroText, lineHeight: 1.0, letterSpacing: isFormal ? '-0.02em' : '0.06em' }}>{data.title}</h1>
          <p className="font-sans mb-10" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: c.heroMuted, fontWeight: 300, maxWidth: '30rem' }}>{data.subtitle}</p>
          <div className="grid grid-cols-3 gap-4">
            {[['ICP', '登録機関'], ['ICA', '移民局提携'], ['即日対応', 'VIPサービス']].map(([title, sub]) => (
              <div key={title} className="px-5 py-4" style={{ border: `1px solid ${c.accent}22`, background: `${c.accent}06` }}>
                <div className="font-label text-[10px] uppercase tracking-widest" style={{ color: c.heroText, opacity: 0.8 }}>{title}</div>
                <div className="font-sans text-xs mt-1" style={{ color: c.accent }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex justify-center">
          <div className="relative" style={{ width: '320px', height: '220px' }}>
            {[{ top: 0, left: 0, borderTop: `2px solid ${c.accent}`, borderLeft: `2px solid ${c.accent}` }, { top: 0, right: 0, borderTop: `2px solid ${c.accent}`, borderRight: `2px solid ${c.accent}` }, { bottom: 0, left: 0, borderBottom: `2px solid ${c.accent}`, borderLeft: `2px solid ${c.accent}` }, { bottom: 0, right: 0, borderBottom: `2px solid ${c.accent}`, borderRight: `2px solid ${c.accent}` }].map((style, i) => (
              <div key={i} className="absolute w-6 h-6" style={style}></div>
            ))}
            <div className="absolute inset-4 overflow-hidden">
              <img src={IMG.dubaiSkyline} alt="" className="w-full h-full object-cover" style={{ filter: c.imgFilter, objectPosition: 'center 40%' }} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-2" style={{ background: `${c.accent}18` }}>
              <span className="font-label text-[8px] uppercase tracking-widest" style={{ color: c.accent }}>UAE · Emirates ID</span>
              <span className="font-label text-[8px]" style={{ color: c.heroMuted }}>ICP Official</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HeroCorporateBank = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <section className="relative overflow-hidden" style={{ background: c.heroBg }}>
    <div className="pt-24 pb-0 px-10 lg:px-16 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-3 gap-0 mb-0" style={{ borderBottom: `1px solid ${c.accent}22` }}>
        {[{ n: '15+', l: 'Partner Banks', sub: '主要UAEパートナー銀行' }, { n: '4–8W', l: 'Average Timeline', sub: '標準開設期間' }, { n: 'KYC', l: 'Optimised Packages', sub: '審査通過率の最大化' }].map((stat, i) => (
          <div key={i} className="py-8 px-6" style={{ borderRight: i < 2 ? `1px solid ${c.accent}22` : 'none' }}>
            <div className="font-headline mb-1" style={{ fontWeight: isFormal ? 800 : 200, fontSize: '2rem', color: c.accent }}>{stat.n}</div>
            <div className="font-label text-[10px] uppercase tracking-widest" style={{ color: c.heroText, opacity: 0.7 }}>{stat.l}</div>
            <div className="font-sans text-xs mt-1" style={{ color: c.heroMuted }}>{stat.sub}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="max-w-screen-2xl mx-auto px-10 lg:px-16">
      <div className="grid lg:grid-cols-5 gap-0 items-stretch">
        <div className="lg:col-span-3 flex flex-col justify-center py-16">
          <div className="font-label text-[10px] uppercase tracking-[0.45em] mb-5" style={{ color: c.accent }}>Corporate Banking · UAE</div>
          <h1 className="font-headline mb-5" style={{ fontWeight: isFormal ? 800 : 200, fontSize: 'clamp(2.6rem,4.5vw,4rem)', color: c.heroText, lineHeight: 1.0, letterSpacing: isFormal ? '-0.02em' : '0.04em' }}>{data.title}</h1>
          <p className="font-sans" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: c.heroMuted, fontWeight: 300, maxWidth: '32rem' }}>{data.subtitle}</p>
        </div>
        <div className="lg:col-span-2 relative hidden lg:block" style={{ minHeight: '300px' }}>
          <img src={IMG.penOnPaper} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: c.imgFilter, objectPosition: 'center 60%' }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${c.heroBg} 0%, transparent 30%)` }}></div>
        </div>
      </div>
    </div>
    <div className="h-[1px] mx-10 lg:mx-16" style={{ background: `linear-gradient(90deg, ${c.accent}55, transparent)` }}></div>
    <div className="pb-6"></div>
  </section>
);

const HeroPersonalBank = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <section className="relative overflow-hidden" style={{ minHeight: '80vh' }}>
    <div className="absolute inset-0">
      <img src={IMG.luxuryLobby} alt="" className="w-full h-full object-cover" style={{ filter: c.imgFilter, transform: 'scale(1.05)', objectPosition: 'center 30%' }} />
    </div>
    <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${c.heroBg}f0 0%, ${c.heroBg}cc 40%, ${c.heroBg}66 70%, transparent 100%)` }}></div>
    <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: `linear-gradient(to top, ${c.heroBg}, transparent)` }}></div>
    {[25, 45, 65].map(top => (
      <div key={top} className="absolute left-0 right-0 hidden lg:block" style={{ top: `${top}%`, height: '1px', background: `linear-gradient(90deg, ${c.accent}30, transparent 50%)`, pointerEvents: 'none' }}></div>
    ))}
    <div className="relative z-10 max-w-screen-2xl mx-auto px-10 lg:px-16 flex flex-col justify-center" style={{ minHeight: '80vh', paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="max-w-lg">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-8 h-[1px]" style={{ background: c.accent }}></div>
          <span className="font-label text-[10px] uppercase tracking-[0.45em]" style={{ color: c.accent }}>Private Wealth Banking</span>
        </div>
        <h1 className="font-headline mb-6" style={{ fontWeight: isFormal ? 800 : 200, fontSize: 'clamp(2.8rem,5vw,4.5rem)', color: c.heroText, lineHeight: 1.0, letterSpacing: isFormal ? '-0.02em' : '0.08em' }}>{data.title}</h1>
        <p className="font-sans mb-10" style={{ fontSize: '0.9rem', lineHeight: 1.9, color: c.heroMuted, fontWeight: 300 }}>{data.subtitle}</p>
        <div className="inline-flex items-center gap-4">
          <div className="w-4 h-[1px]" style={{ background: c.accent, opacity: 0.4 }}></div>
          <span className="font-label text-[9px] uppercase tracking-[0.4em]" style={{ color: c.heroMuted }}>Retail · Wealth · Private Bank</span>
          <div className="w-4 h-[1px]" style={{ background: c.accent, opacity: 0.4 }}></div>
        </div>
      </div>
    </div>
  </section>
);

const HeroTax = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <section className="relative overflow-hidden" style={{ minHeight: '68vh', background: c.heroBg }}>
    <div className="absolute inset-0 flex items-end justify-end pr-8 pb-4 pointer-events-none select-none overflow-hidden">
      <div className="text-right">
        {['VAT', 'CT', 'FTA', 'MOF'].map((word, i) => (
          <div key={word} className="font-headline block leading-none"
            style={{ fontSize: 'clamp(4rem,9vw,8rem)', fontWeight: 800, color: c.accent, opacity: 0.04 + i * 0.01, letterSpacing: '-0.03em' }}>{word}</div>
        ))}
      </div>
    </div>
    <div className="absolute top-28 bottom-12 left-10 lg:left-16 w-[1px]" style={{ background: `linear-gradient(to bottom, ${c.accent}55, transparent)` }}></div>
    <div className="relative z-10 max-w-screen-2xl mx-auto px-16 lg:px-24 flex flex-col justify-center" style={{ minHeight: '68vh', paddingTop: '7rem', paddingBottom: '4rem' }}>
      <div className="max-w-2xl">
        <div className="font-label text-[10px] uppercase tracking-[0.5em] mb-5" style={{ color: c.accent }}>Federal Tax Authority · UAE</div>
        <h1 className="font-headline mb-5" style={{ fontWeight: isFormal ? 800 : 200, fontSize: 'clamp(2.6rem,5vw,4.2rem)', color: c.heroText, lineHeight: 1.0, letterSpacing: isFormal ? '-0.02em' : '0.05em' }}>{data.title}</h1>
        <p className="font-sans mb-10" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: c.heroMuted, fontWeight: 300, maxWidth: '34rem' }}>{data.subtitle}</p>
        <div className="grid grid-cols-2 gap-0 max-w-sm" style={{ border: `1px solid ${c.accent}22` }}>
          {[['VAT登録', '5%税率'], ['法人税', '9%（適用時）']].map(([a, b], i) => (
            <div key={a} className="px-5 py-4" style={{ borderRight: i === 0 ? `1px solid ${c.accent}22` : 'none' }}>
              <div className="font-label text-[10px] uppercase tracking-widest" style={{ color: c.heroText, opacity: 0.8 }}>{a}</div>
              <div className="font-sans text-xs mt-1" style={{ color: c.accent }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-10 lg:left-16 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, ${c.accent}55, transparent)` }}></div>
  </section>
);

const HeroAudit = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <section className="relative overflow-hidden" style={{ minHeight: '75vh', background: c.heroBg }}>
    <div className="grid lg:grid-cols-3 h-full" style={{ minHeight: '75vh' }}>
      <div className="relative hidden lg:block">
        <img src={IMG.bankVault} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: c.imgFilter, objectPosition: '50% center' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent 60%, ${c.heroBg} 100%)` }}></div>
      </div>
      <div className="lg:col-span-2 flex flex-col justify-center px-10 lg:px-16 pt-28 pb-16">
        <div className="flex items-center gap-4 mb-10" style={{ borderBottom: `1px solid ${c.accent}33`, paddingBottom: '1.5rem' }}>
          <span className="font-label text-[9px] uppercase tracking-[0.45em]" style={{ color: c.accent }}>Annual Financial Report Services</span>
          <div className="flex-1"></div>
          <span className="font-label text-[9px]" style={{ color: c.heroMuted }}>IFRS · UAE GAAP</span>
        </div>
        <div className="font-label text-[10px] uppercase tracking-[0.45em] mb-5" style={{ color: c.accent }}>Statutory Audit · Compliance</div>
        <h1 className="font-headline mb-6" style={{ fontWeight: isFormal ? 800 : 200, fontSize: 'clamp(2.6rem,4.5vw,4rem)', color: c.heroText, lineHeight: 1.0, letterSpacing: isFormal ? '-0.02em' : '0.05em' }}>{data.title}</h1>
        <p className="font-sans mb-10" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: c.heroMuted, fontWeight: 300, maxWidth: '36rem' }}>{data.subtitle}</p>
        <div className="grid grid-cols-2 gap-3 max-w-md">
          {['IFRS準拠', 'フリーゾーン対応', '法定監査', '年次報告書作成'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <span style={{ color: c.accent, fontSize: '0.75rem' }}>✓</span>
              <span className="font-sans text-xs" style={{ color: c.heroMuted }}>{item}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-10 pt-6" style={{ borderTop: `1px solid ${c.accent}22` }}>
          <span className="font-label text-[9px] uppercase tracking-widest" style={{ color: c.heroMuted }}>FOJ Advisory · Est. 2020</span>
          <div className="flex-1 h-[1px]" style={{ background: `${c.accent}22` }}></div>
        </div>
      </div>
    </div>
  </section>
);


// ═══════════════════════════════════════════════════════════════════════════
// SECTION HEADING used throughout body
// ═══════════════════════════════════════════════════════════════════════════
const SH = ({ label, c }: { label: string; c: C }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className="font-label text-[10px] uppercase tracking-[0.4em]" style={{ color: c.accent }}>{label}</span>
    <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${c.accent}44, transparent)` }}></div>
  </div>
);


// ═══════════════════════════════════════════════════════════════════════════
// 8 PAGE BODIES — each gets its own image rhythm and layout variation
// ═══════════════════════════════════════════════════════════════════════════

// 1. 法人設立 — after original Hero
const CompanyFormationLayout = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <>
    <Hero />

    {/* Overview — Dubai skyline sticky sidebar on right */}
    <section style={{ background: c.bg }}>
      <StickyOverview data={data} c={c} isFormal={isFormal} img={IMG.dubaiSkyline}
        statNum="50+" statLabel="UAE Free Zones" sideRight />
    </section>

    {/* Full-bleed moment — Dubai aerial with key stat */}
    <FullBleedMoment img={IMG.dubaiAerial} c={c} isFormal={isFormal}
      stat="100%" statLabel="外資完全所有可能 · Mainland &amp; Free Zone"
      quote="正確な構造設計と早期の戦略立案が、長期的な競争優位を左右します。" />

    {/* Bento focus grid */}
    <section className="py-24" style={{ background: c.bg }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <SH label="Key Focus Areas" c={c} />
        <BentoFocus data={data} c={c} isFormal={isFormal} />
      </div>
    </section>

    {/* Services + FAQ side by side, open layout */}
    <section className="py-24" style={{ background: c.alt }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-20">
          <div><SH label="Services Offered" c={c} /><OpenServices data={data} c={c} isFormal={isFormal} /></div>
          <div><SH label="FAQ" c={c} /><OpenFAQ data={data} c={c} isFormal={isFormal} /></div>
        </div>
      </div>
    </section>

    <CTASection c={c} isFormal={isFormal} />
  </>
);

// 2. ライセンス取得 — editorial ghost-text hero + washi sticky
const LicenseLayout = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <>
    <HeroLicense data={data} c={c} isFormal={isFormal} />

    {/* Overview — business stamp sticky on left */}
    <section style={{ background: c.bg }}>
      <StickyOverview data={data} c={c} isFormal={isFormal} img={IMG.businessStamp}
        statNum="3×" statLabel="Licence Types Covered" />
    </section>

    {/* Full-bleed Dubai skyline — 40+ freezones */}
    <FullBleedMoment img={IMG.dubaiSkyline} c={c} isFormal={isFormal} gradientDir="right"
      stat="DED" statLabel="+ 40以上のフリーゾーン対応"
      quote="Business Activity分類の誤りは、銀行口座凍結や罰則の原因となります。" />

    {/* Bento focus */}
    <section className="py-24" style={{ background: c.bg }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <SH label="Key Focus Areas" c={c} />
        <BentoFocus data={data} c={c} isFormal={isFormal} />
      </div>
    </section>

    <section className="py-24" style={{ background: c.alt }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-20">
        <div><SH label="Services Offered" c={c} /><OpenServices data={data} c={c} isFormal={isFormal} /></div>
        <div><SH label="FAQ" c={c} /><OpenFAQ data={data} c={c} isFormal={isFormal} /></div>
      </div>
    </section>

    <CTASection c={c} isFormal={isFormal} />
  </>
);

// 3. VISA取得 — film-poster hero + stone garden sticky
const VisaLayout = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <>
    <HeroVisa data={data} c={c} isFormal={isFormal} />

    {/* Overview — Dubai aerial sticky on right */}
    <section style={{ background: c.bg }}>
      <StickyOverview data={data} c={c} isFormal={isFormal} img={IMG.dubaiAerial}
        statNum="10Y" statLabel="Golden Visa · 長期居住" sideRight />
    </section>

    {/* Full-bleed Dubai skyline — visa destination */}
    <FullBleedMoment img={IMG.dubaiSkyline} c={c} isFormal={isFormal}
      stat="GDRFA" statLabel="Dubai Residency &amp; Foreign Affairs"
      quote="投資家ご自身の長期ビザから、従業員・家族の呼び寄せまで一元管理します。" />

    <section className="py-24" style={{ background: c.bg }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <SH label="Key Focus Areas" c={c} />
        <BentoFocus data={data} c={c} isFormal={isFormal} />
      </div>
    </section>

    <section className="py-24" style={{ background: c.alt }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-20">
        <div><SH label="Services Offered" c={c} /><OpenServices data={data} c={c} isFormal={isFormal} /></div>
        <div><SH label="FAQ" c={c} /><OpenFAQ data={data} c={c} isFormal={isFormal} /></div>
      </div>
    </section>

    <CTASection c={c} isFormal={isFormal} />
  </>
);

// 4. エミレーツID取得 — ID card hero + washi sticky
const EmiratesIdLayout = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <>
    <HeroEmiratesId data={data} c={c} isFormal={isFormal} />

    {/* Overview — passport sticky on left */}
    <section style={{ background: c.bg }}>
      <StickyOverview data={data} c={c} isFormal={isFormal} img={IMG.passport}
        statNum="ICP" statLabel="Identity & Citizenship Authority" />
    </section>

    {/* Full-bleed pen on paper — documentation precision */}
    <FullBleedMoment img={IMG.penOnPaper} c={c} isFormal={isFormal} gradientDir="right"
      stat="48H" statLabel="生体認証予約 VIPサービス"
      quote="エミレーツIDはUAEにおけるすべての行政・金融手続きの絶対的な鍵です。" />

    <section className="py-24" style={{ background: c.bg }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <SH label="Key Focus Areas" c={c} />
        <BentoFocus data={data} c={c} isFormal={isFormal} />
      </div>
    </section>

    <section className="py-24" style={{ background: c.alt }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-20">
        <div><SH label="Services Offered" c={c} /><OpenServices data={data} c={c} isFormal={isFormal} /></div>
        <div><SH label="FAQ" c={c} /><OpenFAQ data={data} c={c} isFormal={isFormal} /></div>
      </div>
    </section>

    <CTASection c={c} isFormal={isFormal} />
  </>
);

// 5. 法人銀行口座開設 — dashboard hero + architecture sticky
const CorporateBankLayout = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <>
    <HeroCorporateBank data={data} c={c} isFormal={isFormal} />

    {/* Overview — bank interior sticky on right */}
    <section style={{ background: c.bg }}>
      <StickyOverview data={data} c={c} isFormal={isFormal} img={IMG.bankInterior}
        statNum="15+" statLabel="UAE Partner Banks" sideRight />
    </section>

    {/* Full-bleed Dubai financial district — UAE banking sector */}
    <FullBleedMoment img={IMG.dubaiSkyline} c={c} isFormal={isFormal}
      stat="KYC" statLabel="書類最適化 · 審査通過率の最大化"
      quote="口座開設審査の厳格化が進む今、正確なKYCパッケージの設計が成否を決めます。" />

    <section className="py-24" style={{ background: c.bg }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <SH label="Key Focus Areas" c={c} />
        <BentoFocus data={data} c={c} isFormal={isFormal} />
      </div>
    </section>

    <section className="py-24" style={{ background: c.alt }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-20">
        <div><SH label="Services Offered" c={c} /><OpenServices data={data} c={c} isFormal={isFormal} /></div>
        <div><SH label="FAQ" c={c} /><OpenFAQ data={data} c={c} isFormal={isFormal} /></div>
      </div>
    </section>

    <CTASection c={c} isFormal={isFormal} />
  </>
);

// 6. 個人銀行口座開設 — private estate hero + washi sticky
const PersonalBankLayout = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <>
    <HeroPersonalBank data={data} c={c} isFormal={isFormal} />

    {/* Overview — bank interior sticky on left */}
    <section style={{ background: c.bg }}>
      <StickyOverview data={data} c={c} isFormal={isFormal} img={IMG.bankInterior}
        statNum="3+" statLabel="Banking Tiers · Retail → Private" />
    </section>

    {/* Full-bleed Dubai aerial — UAE wealth destination */}
    <FullBleedMoment img={IMG.dubaiAerial} c={c} isFormal={isFormal} gradientDir="right"
      stat="UAE" statLabel="リテール · ウェルス · プライベートバンク"
      quote="非居住者・新規居住者向けの個別口座戦略を設計し、確実な開設を実現します。" />

    <section className="py-24" style={{ background: c.bg }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <SH label="Key Focus Areas" c={c} />
        <BentoFocus data={data} c={c} isFormal={isFormal} />
      </div>
    </section>

    <section className="py-24" style={{ background: c.alt }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-20">
        <div><SH label="Services Offered" c={c} /><OpenServices data={data} c={c} isFormal={isFormal} /></div>
        <div><SH label="FAQ" c={c} /><OpenFAQ data={data} c={c} isFormal={isFormal} /></div>
      </div>
    </section>

    <CTASection c={c} isFormal={isFormal} />
  </>
);

// 7. 税務署登録 — pure type hero + washi sticky (no image in hero, so two images in body)
const TaxLayout = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <>
    <HeroTax data={data} c={c} isFormal={isFormal} />

    {/* Overview — tax documents sticky on right */}
    <section style={{ background: c.bg }}>
      <StickyOverview data={data} c={c} isFormal={isFormal} img={IMG.taxDocuments}
        statNum="FTA" statLabel="Federal Tax Authority 準拠" sideRight />
    </section>

    {/* Full-bleed Dubai skyline — UAE tax jurisdiction */}
    <FullBleedMoment img={IMG.dubaiSkyline} c={c} isFormal={isFormal}
      stat="VAT" statLabel="+ Corporate Tax · 包括申告代行"
      quote="2023年施行のコーポレートタックスは、フリーゾーン企業にも新たな申告義務を課しています。" />

    <section className="py-24" style={{ background: c.bg }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <SH label="Key Focus Areas" c={c} />
        <BentoFocus data={data} c={c} isFormal={isFormal} />
      </div>
    </section>

    <section className="py-24" style={{ background: c.alt }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-20">
        <div><SH label="Services Offered" c={c} /><OpenServices data={data} c={c} isFormal={isFormal} /></div>
        <div><SH label="FAQ" c={c} /><OpenFAQ data={data} c={c} isFormal={isFormal} /></div>
      </div>
    </section>

    <CTASection c={c} isFormal={isFormal} />
  </>
);

// 8. 会計監査 — report-cover hero + pen-on-paper sticky
const AuditLayout = ({ data, c, isFormal }: { data: ServicePageData; c: C; isFormal: boolean }) => (
  <>
    <HeroAudit data={data} c={c} isFormal={isFormal} />

    {/* Overview — pen-on-paper sticky on left */}
    <section style={{ background: c.bg }}>
      <StickyOverview data={data} c={c} isFormal={isFormal} img={IMG.penOnPaper}
        statNum="IFRS" statLabel="国際財務報告基準 準拠" />
    </section>

    {/* Full-bleed business stamp — official audit certification */}
    <FullBleedMoment img={IMG.businessStamp} c={c} isFormal={isFormal} gradientDir="right"
      stat="法定" statLabel="監査報告書 · フリーゾーン当局提出"
      quote="UAEで法定監査を実施できるのは認定公認会計士事務所のみです。FOJが一括でコーディネートします。" />

    <section className="py-24" style={{ background: c.bg }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
        <SH label="Key Focus Areas" c={c} />
        <BentoFocus data={data} c={c} isFormal={isFormal} />
      </div>
    </section>

    <section className="py-24" style={{ background: c.alt }}>
      <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 grid md:grid-cols-2 gap-20">
        <div><SH label="Services Offered" c={c} /><OpenServices data={data} c={c} isFormal={isFormal} /></div>
        <div><SH label="FAQ" c={c} /><OpenFAQ data={data} c={c} isFormal={isFormal} /></div>
      </div>
    </section>

    <CTASection c={c} isFormal={isFormal} />
  </>
);


// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════
export const ServiceContentSection: React.FC<{ data: ServicePageData }> = ({ data }) => {
  const { theme } = useTheme();
  const c = TC[theme] ?? TC['zen'];
  const isFormal = theme === 'formal';

  switch (data.id) {
    case 'company-formation':       return <CompanyFormationLayout data={data} c={c} isFormal={isFormal} />;
    case 'license-acquisition':     return <LicenseLayout          data={data} c={c} isFormal={isFormal} />;
    case 'visa-acquisition':        return <VisaLayout             data={data} c={c} isFormal={isFormal} />;
    case 'emirates-id-acquisition': return <EmiratesIdLayout       data={data} c={c} isFormal={isFormal} />;
    case 'corporate-bank-account':  return <CorporateBankLayout    data={data} c={c} isFormal={isFormal} />;
    case 'personal-bank-account':   return <PersonalBankLayout     data={data} c={c} isFormal={isFormal} />;
    case 'tax-registration':        return <TaxLayout              data={data} c={c} isFormal={isFormal} />;
    case 'accounting-audit':        return <AuditLayout            data={data} c={c} isFormal={isFormal} />;
    default:
      return (
        <section className="py-24" style={{ background: c.bg }}>
          <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 space-y-8">
            {data.overview.map((p, i) => (
              <p key={i} className="font-sans text-base leading-loose" style={{ color: c.text, fontWeight: 300 }}>{p}</p>
            ))}
          </div>
        </section>
      );
  }
};

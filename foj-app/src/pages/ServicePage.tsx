import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { getServiceBySlug } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ThemeToggle } from '../components/ThemeToggle';

// ─── Theme configuration ─────────────────────────────────────────────────────
const TC = {
  formal: {
    pageBg:       '#f0ebe2',
    sectionAlt:   '#f7f3ec',
    text:         '#2f342e',
    textMuted:    '#7a7060',
    primary:      '#00113a',
    accent:       '#cca830',
    cardBg:       'rgba(0,17,58,0.04)',
    cardBorder:   'rgba(0,17,58,0.1)',
    heroBg:       'rgba(0,17,58,0.72)',
    heroTitle:    '#f0ebe2',
    heroAccent:   '#cca830',
    divider:      'rgba(0,17,58,0.1)',
    checkMark:    '#cca830',
    stepNumBg:    '#00113a',
    stepNumText:  '#f0ebe2',
    ctaBg:        '#00113a',
    ctaText:      '#f0ebe2',
    ctaAccent:    '#cca830',
    tagBg:        'rgba(204,168,48,0.12)',
    tagText:      '#cca830',
  },
  luxurious: {
    pageBg:       '#080808',
    sectionAlt:   '#0f0f0f',
    text:         '#e0d8c8',
    textMuted:    '#6b6050',
    primary:      '#e9c176',
    accent:       '#e9c176',
    cardBg:       'rgba(233,193,118,0.04)',
    cardBorder:   'rgba(233,193,118,0.12)',
    heroBg:       'rgba(8,8,8,0.68)',
    heroTitle:    '#e9c176',
    heroAccent:   '#c5a059',
    divider:      'rgba(233,193,118,0.12)',
    checkMark:    '#e9c176',
    stepNumBg:    'transparent',
    stepNumText:  '#e9c176',
    ctaBg:        '#0a0a0a',
    ctaText:      '#e0d8c8',
    ctaAccent:    '#e9c176',
    tagBg:        'rgba(233,193,118,0.08)',
    tagText:      '#e9c176',
  },
  zen: {
    pageBg:       '#faf9f5',
    sectionAlt:   '#f2ede4',
    text:         '#2f342e',
    textMuted:    '#787c75',
    primary:      '#775a19',
    accent:       '#775a19',
    cardBg:       'rgba(119,90,25,0.04)',
    cardBorder:   'rgba(119,90,25,0.12)',
    heroBg:       'rgba(26,31,24,0.7)',
    heroTitle:    '#f5f0e6',
    heroAccent:   '#cca830',
    divider:      'rgba(119,90,25,0.12)',
    checkMark:    '#775a19',
    stepNumBg:    '#775a19',
    stepNumText:  '#faf9f5',
    ctaBg:        '#1a1f18',
    ctaText:      '#f0ebe2',
    ctaAccent:    '#cca830',
    tagBg:        'rgba(119,90,25,0.1)',
    tagText:      '#775a19',
  },
  sovereign: {
    pageBg:       '#061025',
    sectionAlt:   '#040d1e',
    text:         '#c8d4e8',
    textMuted:    '#4a6090',
    primary:      '#d4af37',
    accent:       '#d4af37',
    cardBg:       'rgba(212,175,55,0.04)',
    cardBorder:   'rgba(212,175,55,0.15)',
    heroBg:       'rgba(4,13,30,0.72)',
    heroTitle:    '#d4af37',
    heroAccent:   '#f0d060',
    divider:      'rgba(212,175,55,0.15)',
    checkMark:    '#d4af37',
    stepNumBg:    'transparent',
    stepNumText:  '#d4af37',
    ctaBg:        '#040d1e',
    ctaText:      '#c8d4e8',
    ctaAccent:    '#d4af37',
    tagBg:        'rgba(212,175,55,0.08)',
    tagText:      '#d4af37',
  },
  pavilion: {
    pageBg:       '#0d0907',
    sectionAlt:   '#080604',
    text:         '#d4c0a0',
    textMuted:    '#5a4030',
    primary:      '#c4862a',
    accent:       '#c4862a',
    cardBg:       'rgba(196,134,42,0.05)',
    cardBorder:   'rgba(196,134,42,0.18)',
    heroBg:       'rgba(8,6,4,0.7)',
    heroTitle:    '#c4862a',
    heroAccent:   '#e8a840',
    divider:      'rgba(196,134,42,0.15)',
    checkMark:    '#c4862a',
    stepNumBg:    'transparent',
    stepNumText:  '#c4862a',
    ctaBg:        '#080604',
    ctaText:      '#d4c0a0',
    ctaAccent:    '#c4862a',
    tagBg:        'rgba(196,134,42,0.08)',
    tagText:      '#c4862a',
  },
} as const;

// ─── Accent line component ────────────────────────────────────────────────────
const AccentLine: React.FC<{ color: string }> = ({ color }) => (
  <div className="w-10 h-[2px] mb-6" style={{ background: color }}></div>
);

// ─── Section label ────────────────────────────────────────────────────────────
const SectionLabel: React.FC<{ text: string; tagBg: string; tagText: string }> = ({ text, tagBg, tagText }) => (
  <div className="inline-block px-3 py-1 mb-4 font-label text-[9px] uppercase tracking-[0.35em]"
    style={{ background: tagBg, color: tagText }}>
    {text}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
export const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const c = TC[theme];
  const service = slug ? getServiceBySlug(slug) : null;

  if (!service) {
    return (
      <div style={{ background: c.pageBg, color: c.text, minHeight: '100vh' }}
        className="flex flex-col items-center justify-center gap-4">
        <Navbar />
        <p className="font-headline text-2xl mt-32">Service not found</p>
        <Link to="/services" className="font-label text-sm uppercase tracking-widest"
          style={{ color: c.accent }}>
          ← Back to Services
        </Link>
        <Footer />
      </div>
    );
  }

  const isSovereign = theme === 'sovereign';
  const isPavilion = theme === 'pavilion';
  const isLuxurious = theme === 'luxurious';
  const isFormal = theme === 'formal';

  return (
    <div style={{ background: c.pageBg }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '70vh' }}>
        {/* BG image */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `url(${service.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.45,
          filter: isSovereign ? 'brightness(0.7) saturate(0.6) hue-rotate(200deg)'
                : isPavilion  ? 'brightness(0.6) saturate(0.7) sepia(0.5)'
                : isLuxurious ? 'brightness(0.55) saturate(0.7) hue-rotate(200deg)'
                : isFormal    ? 'brightness(0.55) saturate(0.75)'
                :               'brightness(0.55) saturate(0.8) sepia(0.3)',
        }}></div>

        {/* overlay */}
        <div className="absolute inset-0 z-0" style={{ background: c.heroBg }}></div>

        {/* sovereign gold rule */}
        {isSovereign && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] z-10"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 30%, #f0d060 50%, #d4af37 70%, transparent 100%)' }}></div>
        )}

        {/* pavilion diamond rule */}
        {isPavilion && (
          <div className="absolute bottom-0 left-0 right-0 flex items-center z-10" style={{ height: '1px' }}>
            <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,134,42,0.5))' }}></div>
            <div className="w-1 h-1 rotate-45 shrink-0 mx-1.5" style={{ background: 'rgba(196,134,42,0.6)' }}></div>
            <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, rgba(196,134,42,0.5), transparent)' }}></div>
          </div>
        )}

        {/* content */}
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 lg:px-12 flex flex-col justify-end"
          style={{ minHeight: '70vh', paddingBottom: '5rem', paddingTop: '10rem' }}>

          {/* breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="font-label text-[10px] uppercase tracking-widest transition-colors"
              style={{ color: c.textMuted }}
              onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}>
              Home
            </Link>
            <span className="font-label text-[10px]" style={{ color: c.textMuted }}>/</span>
            <Link to="/services" className="font-label text-[10px] uppercase tracking-widest transition-colors"
              style={{ color: c.textMuted }}
              onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}>
              Services
            </Link>
            <span className="font-label text-[10px]" style={{ color: c.textMuted }}>/</span>
            <span className="font-label text-[10px] uppercase tracking-widest" style={{ color: c.accent }}>{service.title}</span>
          </div>

          <div className="max-w-3xl">
            <div className="font-label text-[10px] uppercase tracking-[0.35em] mb-3" style={{ color: c.heroAccent }}>
              {service.titleEn}
            </div>
            <h1 className="font-headline mb-5" style={{
              fontWeight: isFormal ? 800 : isLuxurious ? 200 : isPavilion ? 100 : isSovereign ? 200 : 300,
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: c.heroTitle,
              letterSpacing: isFormal ? '-0.02em' : '0.04em',
              lineHeight: 1.1,
            }}>
              {service.title}
            </h1>
            <p className="font-sans text-base leading-loose mb-10 max-w-xl"
              style={{ color: isFormal ? 'rgba(240,235,226,0.75)' : 'rgba(200,212,232,0.65)', fontWeight: 300 }}>
              {service.subtitle}
            </p>

            {/* stat badge */}
            <div className="inline-flex items-center gap-4 px-6 py-4"
              style={{
                background: `${c.cardBg}`,
                border: `1px solid ${c.cardBorder}`,
                backdropFilter: 'blur(12px)',
              }}>
              <span className="font-headline" style={{ fontWeight: isFormal ? 800 : 200, fontSize: '2rem', color: c.accent }}>
                {service.stat.number}
              </span>
              <span className="font-label text-xs uppercase tracking-widest" style={{ color: c.heroTitle, opacity: 0.7 }}>
                {service.stat.label}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: c.pageBg }}>
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionLabel text="Overview" tagBg={c.tagBg} tagText={c.tagText} />
              <AccentLine color={c.accent} />
              <h2 className="font-headline mb-8" style={{
                fontWeight: isFormal ? 700 : 200,
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: isFormal ? c.primary : c.text,
                letterSpacing: isFormal ? '-0.01em' : '0.05em',
                lineHeight: 1.2,
              }}>
                {service.overview.heading}
              </h2>
            </div>
            <div className="space-y-6">
              {service.overview.paragraphs.map((p, i) => (
                <p key={i} className="font-sans text-base leading-loose"
                  style={{ color: c.text, fontWeight: 300, opacity: i === 0 ? 0.9 : 0.75 }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ───────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: c.sectionAlt }}>
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <SectionLabel text="Key Challenges" tagBg={c.tagBg} tagText={c.tagText} />
          <h2 className="font-headline mb-14" style={{
            fontWeight: isFormal ? 700 : 200,
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            color: isFormal ? c.primary : c.text,
            letterSpacing: isFormal ? '-0.01em' : '0.05em',
          }}>
            {service.challenges.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.challenges.items.map((item, i) => (
              <div key={i} className="p-8 transition-all duration-300"
                style={{
                  background: c.cardBg,
                  border: `1px solid ${c.cardBorder}`,
                  borderLeft: `3px solid ${c.accent}`,
                }}>
                <div className="font-label text-[10px] uppercase tracking-widest mb-3" style={{ color: c.accent }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-headline mb-3" style={{
                  fontWeight: isFormal ? 700 : 400,
                  fontSize: '1rem',
                  color: isFormal ? c.primary : c.text,
                  letterSpacing: '0.03em',
                }}>
                  {item.title}
                </h3>
                <p className="font-sans text-sm leading-loose" style={{ color: c.textMuted }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH ─────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: c.pageBg }}>
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <SectionLabel text="Our Approach" tagBg={c.tagBg} tagText={c.tagText} />
          <h2 className="font-headline mb-16" style={{
            fontWeight: isFormal ? 700 : 200,
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            color: isFormal ? c.primary : c.text,
            letterSpacing: isFormal ? '-0.01em' : '0.05em',
          }}>
            {service.approach.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.approach.steps.map((step, i) => (
              <div key={i} className="relative">
                {/* connector line between steps */}
                {i < service.approach.steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[calc(100%_-_1rem)] w-full h-[1px] z-0"
                    style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)`, opacity: 0.3, width: '2rem' }}></div>
                )}
                <div className="font-headline mb-4" style={{
                  fontWeight: isFormal ? 800 : 200,
                  fontSize: '3rem',
                  color: c.accent,
                  opacity: 0.6,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>
                  {step.num}
                </div>
                <div className="w-8 h-[1px] mb-5" style={{ background: c.accent, opacity: 0.4 }}></div>
                <h3 className="font-headline mb-4" style={{
                  fontWeight: isFormal ? 700 : 400,
                  fontSize: '1.05rem',
                  color: isFormal ? c.primary : c.text,
                  letterSpacing: '0.03em',
                }}>
                  {step.title}
                </h3>
                <p className="font-sans text-sm leading-loose" style={{ color: c.textMuted }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INCLUDED ─────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: c.sectionAlt }}>
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <SectionLabel text="What's Included" tagBg={c.tagBg} tagText={c.tagText} />
              <AccentLine color={c.accent} />
              <h2 className="font-headline" style={{
                fontWeight: isFormal ? 700 : 200,
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                color: isFormal ? c.primary : c.text,
                letterSpacing: isFormal ? '-0.01em' : '0.05em',
                lineHeight: 1.2,
              }}>
                {service.included.heading}
              </h2>
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.included.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-3"
                    style={{ borderBottom: `1px solid ${c.divider}` }}>
                    <span className="font-headline mt-0.5 shrink-0" style={{ color: c.checkMark, fontSize: '0.85rem' }}>✓</span>
                    <span className="font-sans text-sm leading-relaxed" style={{ color: c.text, opacity: 0.85 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: c.pageBg }}>
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <SectionLabel text="Timeline" tagBg={c.tagBg} tagText={c.tagText} />
          <h2 className="font-headline mb-16" style={{
            fontWeight: isFormal ? 700 : 200,
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            color: isFormal ? c.primary : c.text,
            letterSpacing: isFormal ? '-0.01em' : '0.05em',
          }}>
            {service.timeline.heading}
          </h2>

          {/* horizontal timeline track */}
          <div className="relative">
            <div className="hidden md:block absolute top-5 left-0 right-0 h-[1px]"
              style={{ background: `linear-gradient(90deg, ${c.accent}, ${c.accent}33, transparent)`, opacity: 0.3 }}></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {service.timeline.steps.map((step, i) => (
                <div key={i} className="relative">
                  {/* node */}
                  <div className="w-3 h-3 mb-6 hidden md:block" style={{
                    background: i === 0 ? c.accent : c.cardBg,
                    border: `2px solid ${c.accent}`,
                    borderRadius: '50%',
                  }}></div>
                  <div className="font-label text-[9px] uppercase tracking-widest mb-2" style={{ color: c.accent }}>
                    {step.phase}
                  </div>
                  <div className="font-headline text-lg mb-3" style={{
                    color: isFormal ? c.primary : c.text,
                    fontWeight: isFormal ? 700 : 300,
                  }}>
                    {step.duration}
                  </div>
                  <p className="font-sans text-sm leading-loose" style={{ color: c.textMuted }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY FOJ ──────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: c.sectionAlt }}>
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <SectionLabel text="Why FOJ" tagBg={c.tagBg} tagText={c.tagText} />
          <AccentLine color={c.accent} />
          <h2 className="font-headline mb-14" style={{
            fontWeight: isFormal ? 700 : 200,
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            color: isFormal ? c.primary : c.text,
            letterSpacing: isFormal ? '-0.01em' : '0.05em',
          }}>
            {service.whyFOJ.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.whyFOJ.reasons.map((reason, i) => (
              <div key={i} className="p-8"
                style={{
                  background: c.cardBg,
                  border: `1px solid ${c.cardBorder}`,
                }}>
                <div className="w-8 h-[2px] mb-6" style={{ background: c.accent }}></div>
                <h3 className="font-headline mb-4" style={{
                  fontWeight: isFormal ? 700 : 400,
                  fontSize: '1.05rem',
                  color: isFormal ? c.primary : c.accent,
                  letterSpacing: '0.03em',
                }}>
                  {reason.title}
                </h3>
                <p className="font-sans text-sm leading-loose" style={{ color: c.textMuted }}>
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: c.ctaBg }}>
        {isSovereign && (
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 30%, #f0d060 50%, #d4af37 70%, transparent 100%)' }}></div>
        )}
        {isPavilion && (
          <div className="absolute top-0 left-0 right-0 flex items-center" style={{ height: '1px' }}>
            <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,134,42,0.4))' }}></div>
            <div className="w-1 h-1 rotate-45 shrink-0 mx-1.5" style={{ background: 'rgba(196,134,42,0.4)' }}></div>
            <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, rgba(196,134,42,0.4), transparent)' }}></div>
          </div>
        )}
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12 text-center">
          <div className="font-label text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: c.ctaAccent, opacity: 0.7 }}>
            完全紹介制 · Referral Required
          </div>
          <h2 className="font-headline mb-6" style={{
            fontWeight: isFormal ? 800 : 200,
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            color: c.ctaText,
            letterSpacing: isFormal ? '-0.01em' : '0.08em',
          }}>
            {service.title}の手続きについてご相談ください
          </h2>
          <p className="font-sans text-sm leading-loose mb-10 max-w-xl mx-auto"
            style={{ color: c.ctaText, opacity: 0.55, fontWeight: 300 }}>
            FOJのアドバイザリーチームが、御社の状況に最適な進出スキームを設計します。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/#contact"
              className="px-10 py-4 font-label text-[11px] uppercase tracking-widest transition-all duration-300"
              style={{ background: c.ctaAccent, color: c.ctaBg }}>
              お問い合わせ
            </a>
            <Link to="/services"
              className="px-10 py-4 font-label text-[11px] uppercase tracking-widest transition-all duration-300"
              style={{ border: `1px solid ${c.ctaAccent}`, color: c.ctaAccent }}>
              サービス一覧
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ThemeToggle />
    </div>
  );
};

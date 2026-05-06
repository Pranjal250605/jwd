import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { services } from '../data/services';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ThemeToggle } from '../components/ThemeToggle';

const TC = {
  formal: {
    pageBg:     '#f0ebe2',
    sectionAlt: '#f7f3ec',
    text:       '#2f342e',
    textMuted:  '#7a7060',
    primary:    '#00113a',
    accent:     '#cca830',
    cardBg:     'rgba(0,17,58,0.04)',
    cardBorder: 'rgba(0,17,58,0.1)',
    heroBg:     '#00113a',
    heroText:   '#f0ebe2',
    heroMuted:  'rgba(240,235,226,0.5)',
    tagBg:      'rgba(204,168,48,0.12)',
    tagText:    '#cca830',
    linkColor:  '#cca830',
  },
  luxurious: {
    pageBg:     '#080808',
    sectionAlt: '#0f0f0f',
    text:       '#e0d8c8',
    textMuted:  '#6b6050',
    primary:    '#e9c176',
    accent:     '#e9c176',
    cardBg:     'rgba(233,193,118,0.04)',
    cardBorder: 'rgba(233,193,118,0.12)',
    heroBg:     '#080808',
    heroText:   '#e9c176',
    heroMuted:  'rgba(233,193,118,0.35)',
    tagBg:      'rgba(233,193,118,0.08)',
    tagText:    '#e9c176',
    linkColor:  '#e9c176',
  },
  zen: {
    pageBg:     '#faf9f5',
    sectionAlt: '#f2ede4',
    text:       '#2f342e',
    textMuted:  '#787c75',
    primary:    '#775a19',
    accent:     '#775a19',
    cardBg:     'rgba(119,90,25,0.04)',
    cardBorder: 'rgba(119,90,25,0.12)',
    heroBg:     '#1a1f18',
    heroText:   '#f5f0e6',
    heroMuted:  'rgba(245,240,230,0.45)',
    tagBg:      'rgba(119,90,25,0.1)',
    tagText:    '#775a19',
    linkColor:  '#775a19',
  },
  sovereign: {
    pageBg:     '#061025',
    sectionAlt: '#040d1e',
    text:       '#c8d4e8',
    textMuted:  '#4a6090',
    primary:    '#d4af37',
    accent:     '#d4af37',
    cardBg:     'rgba(212,175,55,0.04)',
    cardBorder: 'rgba(212,175,55,0.15)',
    heroBg:     '#040d1e',
    heroText:   '#d4af37',
    heroMuted:  'rgba(212,175,55,0.35)',
    tagBg:      'rgba(212,175,55,0.08)',
    tagText:    '#d4af37',
    linkColor:  '#d4af37',
  },
  pavilion: {
    pageBg:     '#0d0907',
    sectionAlt: '#080604',
    text:       '#d4c0a0',
    textMuted:  '#5a4030',
    primary:    '#c4862a',
    accent:     '#c4862a',
    cardBg:     'rgba(196,134,42,0.05)',
    cardBorder: 'rgba(196,134,42,0.18)',
    heroBg:     '#080604',
    heroText:   '#c4862a',
    heroMuted:  'rgba(196,134,42,0.35)',
    tagBg:      'rgba(196,134,42,0.08)',
    tagText:    '#c4862a',
    linkColor:  '#c4862a',
  },
} as const;

// service number labels in Japanese context
const SERVICE_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];

export const ServicesIndex: React.FC = () => {
  const { theme } = useTheme();
  const c = TC[theme];
  const isFormal = theme === 'formal';
  const isSovereign = theme === 'sovereign';
  const isPavilion = theme === 'pavilion';

  return (
    <div style={{ background: c.pageBg, minHeight: '100vh' }}>
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20" style={{ background: c.heroBg }}>
        {isSovereign && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 30%, #f0d060 50%, #d4af37 70%, transparent 100%)' }}></div>
        )}
        {isPavilion && (
          <>
            <div className="absolute bottom-0 left-0 right-0 flex items-center" style={{ height: '1px' }}>
              <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,134,42,0.4))' }}></div>
              <div className="w-1 h-1 rotate-45 shrink-0 mx-1.5" style={{ background: 'rgba(196,134,42,0.4)' }}></div>
              <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, rgba(196,134,42,0.4), transparent)' }}></div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
              backgroundImage: 'radial-gradient(circle, rgba(196,134,42,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}></div>
          </>
        )}
        {isSovereign && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}></div>
        )}

        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="font-label text-[10px] uppercase tracking-widest"
              style={{ color: c.heroMuted }}>Home</Link>
            <span className="font-label text-[10px]" style={{ color: c.heroMuted }}>/</span>
            <span className="font-label text-[10px] uppercase tracking-widest" style={{ color: c.heroText }}>Services</span>
          </div>

          <div className="font-label text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: c.heroMuted }}>
            UAE · Dubai Business Services
          </div>
          <h1 className="font-headline mb-6" style={{
            fontWeight: isFormal ? 800 : 200,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: c.heroText,
            letterSpacing: isFormal ? '-0.01em' : '0.06em',
            lineHeight: 1.1,
          }}>
            8つのワンストップサービス
          </h1>
          <p className="font-sans text-base leading-loose max-w-2xl" style={{ color: c.heroMuted, fontWeight: 300 }}>
            法人設立からライセンス取得・VISA・エミレーツID・銀行口座開設・税務署登録・会計監査まで、
            ドバイ進出に必要なすべての手続きをFOJが一括で代行します。
          </p>
        </div>
      </section>

      {/* ── SERVICE GRID ────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: c.pageBg }}>
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                to={`/service/${service.slug}`}
                className="group block relative overflow-hidden transition-all duration-500"
                style={{
                  border: `1px solid ${c.cardBorder}`,
                  marginTop: i >= 4 ? '-1px' : '0',
                  marginLeft: i % 4 !== 0 ? '-1px' : '0',
                }}
              >
                {/* image */}
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{
                    backgroundImage: `url(${service.heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: isSovereign ? 'brightness(0.5) saturate(0.5) hue-rotate(200deg)'
                          : isPavilion  ? 'brightness(0.4) saturate(0.6) sepia(0.5)'
                          : isFormal    ? 'brightness(0.45) saturate(0.7)'
                          : theme === 'luxurious' ? 'brightness(0.4) saturate(0.6) hue-rotate(200deg)'
                          :                'brightness(0.4) saturate(0.7) sepia(0.3)',
                  }}></div>
                  <div className="absolute inset-0" style={{
                    background: `linear-gradient(to bottom, transparent 40%, ${c.cardBg === 'rgba(0,17,58,0.04)' ? c.heroBg : c.pageBg} 100%)`,
                  }}></div>
                  {/* service number overlay */}
                  <div className="absolute top-4 left-5 font-headline"
                    style={{ color: c.accent, opacity: 0.6, fontWeight: isFormal ? 800 : 200, fontSize: '1.4rem' }}>
                    {SERVICE_NUMBERS[i]}
                  </div>
                </div>

                {/* content */}
                <div className="p-6" style={{ background: c.cardBg }}>
                  <div className="font-label text-[8px] uppercase tracking-[0.35em] mb-2" style={{ color: c.accent, opacity: 0.7 }}>
                    {service.titleEn}
                  </div>
                  <h3 className="font-headline mb-3 transition-colors duration-300" style={{
                    fontWeight: isFormal ? 700 : 400,
                    fontSize: '1.05rem',
                    color: isFormal ? c.primary : c.text,
                    letterSpacing: '0.03em',
                  }}>
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs leading-relaxed mb-5" style={{ color: c.textMuted }}>
                    {service.subtitle}
                  </p>
                  <div className="flex items-center gap-2 font-label text-[10px] uppercase tracking-widest transition-colors duration-300"
                    style={{ color: c.linkColor }}>
                    <span>詳細を見る</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOJ ADVANTAGE ───────────────────────────────────────────── */}
      <section className="py-20" style={{ background: c.sectionAlt }}>
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          {isSovereign && (
            <div className="h-[1px] w-full mb-16"
              style={{ background: 'linear-gradient(90deg, #d4af37, rgba(212,175,55,0.1), transparent)' }}></div>
          )}
          {isPavilion && (
            <div className="flex items-center gap-4 mb-16">
              <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(196,134,42,0.4)' }}></div>
              <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(196,134,42,0.3), transparent)' }}></div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-4 font-label text-[9px] uppercase tracking-[0.35em]"
                style={{ background: c.tagBg, color: c.tagText }}>
                FOJ Advantage
              </div>
              <div className="w-10 h-[2px] mb-6" style={{ background: c.accent }}></div>
              <h2 className="font-headline mb-6" style={{
                fontWeight: isFormal ? 700 : 200,
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                color: isFormal ? c.primary : c.text,
                letterSpacing: isFormal ? '-0.01em' : '0.05em',
                lineHeight: 1.2,
              }}>
                唯一の日本語対応<br />ワンストップ・アドバイザリー
              </h2>
              <p className="font-sans text-sm leading-loose" style={{ color: c.textMuted, fontWeight: 300 }}>
                分断したベンダーを使い回す非効率を排し、整合のとれた進出スキームと確実な実行を提供します。
                8つの必須手続きをひとつのチームが一括して担当することで、手続きの漏れ・遅延・コスト超過を防ぎます。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { num: '8', label: '必須手続きすべてに対応' },
                { num: '1', label: 'チームで一括管理' },
                { num: '日本語', label: '対応・日系企業専門' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-5"
                  style={{ border: `1px solid ${c.cardBorder}`, background: c.cardBg }}>
                  <span className="font-headline shrink-0" style={{
                    fontWeight: isFormal ? 800 : 200,
                    fontSize: '1.8rem',
                    color: c.accent,
                    letterSpacing: '-0.02em',
                    minWidth: '4rem',
                  }}>
                    {item.num}
                  </span>
                  <span className="font-sans text-sm" style={{ color: c.text, opacity: 0.8 }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="py-20 text-center" style={{ background: c.heroBg }}>
        {isSovereign && (
          <div className="absolute top-0 left-0 right-0 h-[1px]"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 30%, #f0d060 50%, #d4af37 70%, transparent 100%)' }}></div>
        )}
        <div className="max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="font-label text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: c.heroMuted }}>
            完全紹介制 · Referral Required
          </div>
          <h2 className="font-headline mb-6" style={{
            fontWeight: isFormal ? 800 : 200,
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            color: c.heroText,
            letterSpacing: isFormal ? '-0.01em' : '0.08em',
          }}>
            ドバイ進出の最初の一手はFOJへ
          </h2>
          <a href="/#contact"
            className="inline-block mt-6 px-10 py-4 font-label text-[11px] uppercase tracking-widest transition-all duration-300"
            style={{ background: c.accent, color: c.heroBg }}>
            お問い合わせ
          </a>
        </div>
      </section>

      <Footer />
      <ThemeToggle />
    </div>
  );
};

import React from 'react';
import { siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';

export const HistorySection: React.FC = () => {
  const { theme } = useTheme();
  const { history } = siteContent.sections;

  if (theme === 'formal') {
    return (
      <section className="py-28 relative overflow-hidden" style={{ background: '#f0ebe2' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="form-fade form-s1 flex items-center gap-4 mb-12">
            <div className="h-[3px] w-16" style={{ background: 'linear-gradient(90deg, #cca830, transparent)' }}></div>
            <span className="font-label text-[9px] uppercase tracking-[0.35em]" style={{ color: '#9a8c6e' }}>{history.subTitle}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="lg:w-2/3">
              <h2 className="form-fade form-s2 font-headline mb-10"
                style={{ fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#00113a', letterSpacing: '-0.02em' }}>
                {history.title}
              </h2>
              <div className="space-y-6 mb-10">
                {history.paragraphs.map((para, idx) => (
                  <p key={idx} className="form-fade font-sans leading-loose"
                    style={{ animationDelay: `${0.3 + idx * 0.12}s`, color: '#5a5448', fontWeight: 300 }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Image below paragraphs — washi paper representing documented heritage and precision */}
              <div className="form-fade relative overflow-hidden group" style={{ animationDelay: '0.55s' }}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWsgkQ-8fVt3mUEZCjvGkj-lVEB1XvSezhJUs3TcTOeUoMZf7Ck8x4t7PfZTmdAPm1uyqDYeV91zhfZv5Z5GUYNlrW9RkgYYyhbn7sr8kx4midHDRKs5wkivofF9jc3LwtPoZC3RcMY3MxG57xtEqmR1jDixhPXclwczSnBMxGWaNzAHlPhgdX7qsyImXJ7fQ4OBR5Ybo82xalNsZEMfsBYbe5mSwLwcXPcGnQOTYGcGnwEIgzWyaZ4jvSrwF5mxPfqOo4XqlDcNvM"
                  alt="Washi paper — documented heritage and meticulous stewardship"
                  className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  style={{ aspectRatio: '16/6', filter: 'brightness(0.96) contrast(1.04) sepia(12%)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,17,58,0.12) 0%, transparent 50%)' }}></div>
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  <div className="w-4 h-[1px]" style={{ background: '#cca830' }}></div>
                  <span className="font-label text-[8px] uppercase tracking-[0.35em]" style={{ color: 'rgba(240,235,226,0.65)' }}>記録と継承</span>
                </div>
              </div>
            </div>

            <div className="form-fade form-s4 lg:w-1/3 flex flex-col justify-center items-center lg:items-end gap-6">
              <div className="text-center lg:text-right">
                <p className="font-label text-[9px] uppercase tracking-[0.35em] mb-1" style={{ color: '#9a8c6e' }}>Private Portal</p>
                <p className="font-headline" style={{ fontWeight: 800, fontSize: '1.3rem', color: '#00113a' }}>完全紹介制</p>
              </div>
              <button className="font-label text-xs uppercase tracking-[0.25em] px-10 py-4 transition-all duration-300"
                style={{ background: '#00113a', color: '#f0ebe2' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a2d5a'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#00113a'; }}>
                {history.buttonText}
              </button>
              {/* Large decorative number */}
              <div className="font-headline select-none hidden lg:block"
                style={{ fontWeight: 100, fontSize: '7rem', color: 'rgba(0,17,58,0.05)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                100
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (theme === 'luxurious') {
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#0e0e0e' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 10% 60%, rgba(233,193,118,0.04) 0%, transparent 55%)'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Image — pen on paper: precision, documentation, the written contract of trust */}
            <div className="lux-fade lux-s2 relative overflow-hidden group order-2 lg:order-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1roq9jzq0EOiHfhFg8nPDbCN-wWZQhMT07h6sDdjd1ha9RHncGGJNmpz7mh35PzEmTnHO7ZEtxTYIbVaDiy8DXygztPg-w9vQ-9Ojrunti_4QbEWeY-GQP-Zf1MjId1_RRwqCOC7liYEd5NbU1fCX-nvm86kCRND5SpF6YfUwUyuEt9rS1IcLqtE966NTMxB8URmZnwe6-6w9DzCY12gFrmlsSNtgFbnsy-nKFTsh8K62P4ZlepGaiDmlwR30wCcaYlZe0Cl76R0k"
                alt="Precision pen on paper — the covenant of trust"
                className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                style={{ aspectRatio: '3/4', filter: 'grayscale(20%) brightness(0.65) contrast(1.2)' }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'linear-gradient(135deg, rgba(233,193,118,0.06) 0%, transparent 60%)' }}></div>
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(233,193,118,0.3), transparent)' }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 100%)' }}>
                <p className="font-label text-[8px] uppercase tracking-[0.4em]" style={{ color: '#4e4639' }}>
                  約束の証 · The Covenant
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2" style={{ borderLeft: '1px solid rgba(233,193,118,0.15)', paddingLeft: '3rem' }}>
              <span className="font-label text-[10px] uppercase tracking-[0.4em] block mb-6" style={{ color: '#4e4639' }}>
                {history.subTitle}
              </span>
              <h2 className="font-headline mb-10" style={{ fontWeight: 200, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#e5e2e1' }}>
                {history.title}
              </h2>
              <div className="space-y-8">
                {history.paragraphs.map((para, idx) => (
                  <p key={idx} className="font-sans font-light leading-loose" style={{ color: '#9a8f80', fontWeight: 300 }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (theme === 'pavilion') {
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#140e06' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 60% at 15% 50%, rgba(196,134,42,0.06) 0%, transparent 60%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">

          {/* Section label with diamond geometry */}
          <div className="pav-fade pav-s1 flex items-center gap-4 mb-14">
            <div className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ background: '#c4862a', opacity: 0.6 }}></div>
            <div className="h-[1px] w-10" style={{ background: 'linear-gradient(90deg, #c4862a, transparent)' }}></div>
            <span className="font-label text-[9px] uppercase tracking-[0.45em]" style={{ color: 'rgba(196,134,42,0.5)' }}>
              {history.subTitle}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Text — wider left col */}
            <div className="lg:col-span-3">
              <h2 className="pav-fade pav-s2 font-headline mb-10"
                style={{ fontWeight: 100, fontSize: 'clamp(1.6rem,3vw,2.8rem)', color: '#f0e8d8', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {history.title}
              </h2>
              <div className="space-y-6 mb-12">
                {history.paragraphs.map((para, idx) => (
                  <p key={idx} className="pav-fade font-sans leading-loose"
                    style={{ animationDelay: `${0.35 + idx * 0.15}s`, color: '#9a8878', fontWeight: 300 }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Washi paper image alongside text */}
              <div className="pav-fade relative overflow-hidden group" style={{ animationDelay: '0.6s' }}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWsgkQ-8fVt3mUEZCjvGkj-lVEB1XvSezhJUs3TcTOeUoMZf7Ck8x4t7PfZTmdAPm1uyqDYeV91zhfZv5Z5GUYNlrW9RkgYYyhbn7sr8kx4midHDRKs5wkivofF9jc3LwtPoZC3RcMY3MxG57xtEqmR1jDixhPXclwczSnBMxGWaNzAHlPhgdX7qsyImXJ7fQ4OBR5Ybo82xalNsZEMfsBYbe5mSwLwcXPcGnQOTYGcGnwEIgzWyaZ4jvSrwF5mxPfqOo4XqlDcNvM"
                  alt="Heritage documentation"
                  className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  style={{ aspectRatio: '16/6', filter: 'brightness(0.55) contrast(1.1) sepia(40%) saturate(0.9)' }}
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, rgba(20,14,6,0.6) 0%, transparent 50%)' }}></div>
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-6 h-6"
                  style={{ borderTop: '1px solid rgba(196,134,42,0.4)', borderLeft: '1px solid rgba(196,134,42,0.4)' }}></div>
                <div className="absolute bottom-3 right-3 w-6 h-6"
                  style={{ borderBottom: '1px solid rgba(196,134,42,0.4)', borderRight: '1px solid rgba(196,134,42,0.4)' }}></div>
              </div>
            </div>

            {/* Right col — CTA + stat */}
            <div className="lg:col-span-2 flex flex-col gap-8 lg:pt-20"
              style={{ borderLeft: '1px solid rgba(196,134,42,0.12)', paddingLeft: '2.5rem' }}>
              {/* Large decorative number */}
              <div className="select-none">
                <p className="font-headline leading-none" style={{ fontWeight: 100, fontSize: '6rem', color: 'rgba(196,134,42,0.12)', letterSpacing: '-0.04em' }}>100</p>
                <p className="font-label text-[8px] uppercase tracking-[0.4em]" style={{ color: 'rgba(196,134,42,0.4)' }}>Years Vision</p>
              </div>
              <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(196,134,42,0.2), transparent)' }}></div>
              <div>
                <p className="font-label text-[9px] uppercase tracking-[0.35em] mb-3" style={{ color: 'rgba(196,134,42,0.45)' }}>
                  完全紹介制
                </p>
                <p className="font-sans text-sm leading-loose" style={{ color: '#5a4030', fontWeight: 300 }}>
                  既存クライアントまたは提携先からのご紹介がない限り、ご入会を承っておりません。
                </p>
              </div>
              <button className="font-label text-xs uppercase tracking-[0.25em] px-8 py-4 transition-all duration-500 self-start"
                style={{ border: '1px solid rgba(196,134,42,0.4)', color: '#c4862a', background: 'transparent' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(196,134,42,0.1)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                {history.buttonText}
              </button>
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (theme === 'sovereign') {
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#040d1e' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 20% 70%, rgba(212,175,55,0.07) 0%, transparent 50%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Image left */}
            <div className="sov-fade sov-s2 relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWsgkQ-8fVt3mUEZCjvGkj-lVEB1XvSezhJUs3TcTOeUoMZf7Ck8x4t7PfZTmdAPm1uyqDYeV91zhfZv5Z5GUYNlrW9RkgYYyhbn7sr8kx4midHDRKs5wkivofF9jc3LwtPoZC3RcMY3MxG57xtEqmR1jDixhPXclwczSnBMxGWaNzAHlPhgdX7qsyImXJ7fQ4OBR5Ybo82xalNsZEMfsBYbe5mSwLwcXPcGnQOTYGcGnwEIgzWyaZ4jvSrwF5mxPfqOo4XqlDcNvM"
                alt="Heritage documentation"
                className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                style={{ aspectRatio: '4/3', filter: 'brightness(0.6) contrast(1.15) saturate(0.5) hue-rotate(200deg)' }}
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, transparent 60%, rgba(4,13,30,0.6) 100%)' }}></div>
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, #d4af37, rgba(212,175,55,0.2), transparent)' }}></div>
              {/* Gold corner bracket — art deco detail */}
              <div className="absolute top-4 left-4 w-6 h-6 pointer-events-none"
                style={{ borderTop: '1px solid rgba(212,175,55,0.5)', borderLeft: '1px solid rgba(212,175,55,0.5)' }}></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 pointer-events-none"
                style={{ borderBottom: '1px solid rgba(212,175,55,0.5)', borderRight: '1px solid rgba(212,175,55,0.5)' }}></div>
            </div>

            {/* Text right */}
            <div style={{ borderLeft: '1px solid rgba(212,175,55,0.15)', paddingLeft: '3rem' }}>
              <div className="sov-fade sov-s1 flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }}></div>
                <span className="font-label text-[9px] uppercase tracking-[0.4em]" style={{ color: 'rgba(212,175,55,0.5)' }}>
                  {history.subTitle}
                </span>
              </div>
              <h2 className="sov-fade sov-s2 font-headline mb-10"
                style={{ fontWeight: 100, fontSize: 'clamp(1.6rem,3vw,2.6rem)', color: '#f0ece6', letterSpacing: '-0.02em' }}>
                {history.title}
              </h2>
              <div className="space-y-6">
                {history.paragraphs.map((para, idx) => (
                  <p key={idx} className="sov-fade font-sans leading-loose"
                    style={{ animationDelay: `${0.4 + idx * 0.15}s`, color: '#8fa4c0', fontWeight: 300 }}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="sov-fade sov-s5 mt-12 pt-8 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}>
                <div>
                  <p className="font-headline" style={{ fontWeight: 100, fontSize: '3rem', color: 'rgba(212,175,55,0.25)', lineHeight: 1 }}>100</p>
                  <p className="font-label text-[8px] uppercase tracking-[0.4em]" style={{ color: 'rgba(212,175,55,0.4)' }}>Years Vision</p>
                </div>
                <button className="font-label text-xs uppercase tracking-[0.25em] px-8 py-3 transition-all duration-500"
                  style={{ border: '1px solid rgba(212,175,55,0.4)', color: '#d4af37', background: 'transparent' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,175,55,0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                  {history.buttonText}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // zen — Services grid layout
  return (
    <section className="py-36 relative overflow-hidden" style={{ background: '#faf9f5' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-screen-xl mx-auto px-8 lg:px-12">
        <div className="zen-fade zen-s1 flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6">
          <h2 className="font-headline uppercase" style={{ fontWeight: 800, fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: '#2f342e', letterSpacing: '-0.01em' }}>
            {history.title}
          </h2>
          <span className="font-label text-[9px] tracking-[0.4em]" style={{ color: '#787c75' }}>OUR HERITAGE</span>
        </div>

        <div className="kintsugi-line mb-0" style={{ opacity: 0.2 }}></div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'rgba(119,90,25,0.1)' }}>
          {history.paragraphs.map((para, idx) => (
            <div key={idx} className="zen-fade group p-12 transition-colors duration-700 hover:bg-[#f4f4ef]"
              style={{ animationDelay: `${0.2 + idx * 0.18}s` }}>
              <span className="material-symbols-outlined mb-8 block transition-transform duration-500 group-hover:scale-110"
                style={{ color: '#775a19', fontSize: '2rem', fontVariationSettings: "'wght' 100" }}>
                {['castle', 'account_balance', 'auto_awesome_mosaic'][idx]}
              </span>
              <h3 className="font-headline mb-5" style={{ fontWeight: 600, fontSize: '1.05rem', color: '#2f342e' }}>
                {history.subTitle}
              </h3>
              <p className="font-body leading-loose" style={{ fontWeight: 300, color: '#5c605a', fontSize: '0.9rem' }}>{para}</p>
              <div className="mt-8 h-[1px] w-6 transition-all duration-700 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, #775a19, transparent)' }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

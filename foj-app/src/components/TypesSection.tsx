import React from 'react';
import { siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';

export const TypesSection: React.FC = () => {
  const { theme } = useTheme();
  const { types } = siteContent.sections;

  if (theme === 'formal') {
    return (
      <section className="py-28 relative overflow-hidden" style={{ background: '#ece7de' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {types.items.map((item, idx) => (
              <div key={idx}
                className="form-fade group relative p-10 transition-all duration-500 hover:shadow-xl"
                style={{
                  animationDelay: `${0.1 + idx * 0.15}s`,
                  background: '#f7f3ec',
                  borderTop: `4px solid ${idx === 0 ? '#00113a' : '#cca830'}`,
                }}>
                <div className="flex justify-between items-start mb-8">
                  <span className="font-label text-[9px] tracking-[0.35em] uppercase"
                    style={{ color: idx === 0 ? 'rgba(0,17,58,0.35)' : 'rgba(115,92,0,0.4)' }}>
                    Format 0{idx + 1}
                  </span>
                  <span className="material-symbols-outlined transition-transform duration-300 group-hover:scale-110"
                    style={{ color: '#00113a', fontSize: '1.5rem', fontVariationSettings: "'wght' 200" }}>
                    {idx === 0 ? 'account_balance' : 'groups'}
                  </span>
                </div>
                <h3 className="font-headline mb-6" style={{ fontWeight: 800, fontSize: '1.4rem', color: '#00113a', letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <ul className="space-y-4">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans" style={{ color: '#5a5448', fontWeight: 300, fontSize: '0.9rem' }}>
                      <span className="mt-2 w-1.5 h-1.5 shrink-0" style={{ background: '#cca830' }}></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="form-fade form-s4 p-12 lg:p-16" style={{ background: '#00113a' }}>
            <div className="flex flex-col items-center gap-4 text-center">
              {types.highlightBox.map((line, idx) => (
                <p key={idx} className="font-headline"
                  style={{ fontWeight: idx === 0 ? 800 : 300, fontSize: idx === 0 ? '1.4rem' : '1.1rem', color: idx === 0 ? '#f7f3ec' : 'rgba(204,168,48,0.8)', lineHeight: 1.7 }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (theme === 'luxurious') {
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#131313' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(233,193,118,1) 1px, transparent 1px), linear-gradient(90deg, rgba(233,193,118,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          {/* Header row with image */}
          <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h2 className="font-headline mb-4" style={{ fontWeight: 200, fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', color: '#e5e2e1' }}>
                What is a Family Office?
              </h2>
              <div className="h-[1px]" style={{ background: 'linear-gradient(to right, rgba(78,70,57,0.6), transparent)' }}></div>
            </div>
            {/* Japanese architecture — the discreet, purposeful space of a family office */}
            <div className="lux-fade lux-s1 relative overflow-hidden group hidden lg:block">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA80AIU9e41-2rcz8150Gqowwq015ZQLTT3EiLIqzOk4jXVbdmuLn90BKER8Dv_KADSPWoO6oCzAXuxBiIfeBpgGhvMPomMTe7k6_rTrgygFZLxNifXz_7RU8qV0KAFhZV8LvDi0Oj4eAKZqlPhndfgMrew_xLHS1yS8yLAEqWVA1wlomj3zUwrSV0jbFGyrIzHvs73R_fnpZegal-oB3Z0T8MBPL7gI3Tmd78y0GEYbwHG2bq-9PZc_La6jhoc2j_xl5put8_eHVit"
                alt="Private family office space"
                className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                style={{ aspectRatio: '16/7', filter: 'grayscale(30%) brightness(0.55) contrast(1.2)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(19,19,19,0.5) 0%, transparent 40%)' }}></div>
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(233,193,118,0.25), transparent)' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {types.items.map((item, idx) => (
              <div key={idx}
                className={`lux-fade lux-s${idx + 2} group relative p-10 lg:p-12 transition-all duration-700 ${idx === 1 ? 'md:mt-20' : ''}`}
                style={{
                  background: 'rgba(32,31,31,0.5)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(78,70,57,0.4)',
                  borderTop: '1px solid rgba(233,193,118,0.2)',
                }}>
                {/* Top gold accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, #e9c176, transparent)' }}></div>

                <div className="flex items-start gap-4 mb-8">
                  <span className="material-symbols-outlined text-3xl mt-1" style={{ color: '#e9c176', fontVariationSettings: "'wght' 100" }}>
                    {idx === 0 ? 'castle' : 'groups_2'}
                  </span>
                  <h3 className="font-headline" style={{ fontWeight: 300, fontSize: '1.4rem', color: '#c5a059' }}>{item.title}</h3>
                </div>
                <ul className="space-y-4">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans font-light" style={{ color: '#9a8f80', fontSize: '0.9rem', fontWeight: 300 }}>
                      <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: '#e9c176' }}></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lux-fade lux-s4 mt-16 p-10 lg:p-14 text-center"
            style={{ border: '1px solid rgba(78,70,57,0.4)', borderLeft: '3px solid rgba(233,193,118,0.4)' }}>
            {types.highlightBox.map((line, idx) => (
              <p key={idx} className="font-headline" style={{ fontWeight: idx === 0 ? 200 : 300, fontSize: idx === 0 ? '1.1rem' : '1rem', color: idx === 0 ? '#e9c176' : '#9a8f80', lineHeight: 2 }}>{line}</p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (theme === 'pavilion') {
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#0d0907' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(196,134,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 55% at 85% 30%, rgba(196,134,42,0.06) 0%, transparent 60%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-1 rotate-45" style={{ background: '#c4862a', opacity: 0.6 }}></div>
                <span className="font-label text-[9px] uppercase tracking-[0.45em]" style={{ color: 'rgba(196,134,42,0.5)' }}>
                  Family Office Types
                </span>
              </div>
              <h2 className="pav-fade pav-s1 font-headline"
                style={{ fontWeight: 100, fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', color: '#f0e8d8', letterSpacing: '-0.02em' }}>
                ファミリーオフィスとは？
              </h2>
            </div>
            {/* Bonsai image with warm sepia treatment */}
            <div className="pav-fade pav-s2 relative overflow-hidden group hidden lg:block">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZLH3kGe0Tmt9-Oj29skWIBBWxHg75YIOtVuyin-gUDbMOyQqDa7Pkr5TvrV_8WZDNVvp8cgfkDbbwGt_dkCIfP3Y54xKFAEDz1qMZZHLCxvwZpz8ECwLqm28Y8X-U1X-orJEey96FHQQDacn6H4VH5dGS6XHR33BySDN5hEmPuQrA8fKozSc6jSLSbvIGuDlo3Lic5E18bh8wHHr2JHGzFp0uEksuRX0FRJqFVq5E-4jaL089TAyJz6cZVs8JVqaesGXDshrmE0-g"
                alt="Bonsai — generational patience"
                className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                style={{ aspectRatio: '16/7', filter: 'brightness(0.55) contrast(1.1) sepia(35%) saturate(0.85)' }}
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to left, rgba(13,9,7,0.65) 0%, transparent 55%)' }}></div>
              <div className="absolute top-3 left-3 w-6 h-6"
                style={{ borderTop: '1px solid rgba(196,134,42,0.35)', borderLeft: '1px solid rgba(196,134,42,0.35)' }}></div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {types.items.map((item, idx) => (
              <div key={idx}
                className="pav-fade group relative p-10 transition-all duration-700"
                style={{
                  animationDelay: `${0.3 + idx * 0.18}s`,
                  background: 'rgba(24,16,8,0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(90,64,48,0.5)',
                  borderTop: '2px solid rgba(196,134,42,0.55)',
                }}>
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, #c4862a, transparent)' }}></div>
                <div className="flex items-start gap-4 mb-8">
                  <span className="material-symbols-outlined" style={{ color: '#c4862a', fontSize: '1.8rem', fontVariationSettings: "'wght' 100" }}>
                    {idx === 0 ? 'castle' : 'groups_2'}
                  </span>
                  <div>
                    <p className="font-label text-[8px] uppercase tracking-[0.4em] mb-1" style={{ color: 'rgba(196,134,42,0.4)' }}>
                      Format 0{idx + 1}
                    </p>
                    <h3 className="font-headline" style={{ fontWeight: 300, fontSize: '1.3rem', color: '#c4862a' }}>{item.title}</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans" style={{ color: '#9a8878', fontSize: '0.9rem', fontWeight: 300 }}>
                      <span className="mt-[7px] w-1 h-1 rotate-45 shrink-0" style={{ background: '#c4862a' }}></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Highlight box */}
          <div className="pav-fade pav-s5 p-10 lg:p-14 text-center relative"
            style={{ border: '1px solid rgba(196,134,42,0.18)', borderTop: '2px solid rgba(196,134,42,0.45)', background: 'rgba(24,16,8,0.5)' }}>
            {/* Corner diamonds */}
            {[['top-3 left-3', 'rotate-45'], ['top-3 right-3', 'rotate-45'], ['bottom-3 left-3', 'rotate-45'], ['bottom-3 right-3', 'rotate-45']].map(([pos], i) => (
              <div key={i} className={`absolute ${pos} w-1.5 h-1.5 rotate-45`} style={{ background: 'rgba(196,134,42,0.3)' }}></div>
            ))}
            {types.highlightBox.map((line, idx) => (
              <p key={idx} className="font-headline"
                style={{ fontWeight: idx === 0 ? 300 : 100, fontSize: idx === 0 ? '1.1rem' : '0.95rem', color: idx === 0 ? '#c4862a' : '#5a4030', lineHeight: 2 }}>
                {line}
              </p>
            ))}
          </div>

        </div>
      </section>
    );
  }

  if (theme === 'sovereign') {
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#061025' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(126,179,240,0.05) 0%, transparent 50%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">

          {/* Section header with image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }}></div>
                <span className="font-label text-[9px] uppercase tracking-[0.45em]" style={{ color: 'rgba(212,175,55,0.5)' }}>
                  Family Office Types
                </span>
              </div>
              <h2 className="sov-fade sov-s1 font-headline"
                style={{ fontWeight: 100, fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', color: '#f0ece6', letterSpacing: '-0.02em' }}>
                ファミリーオフィスとは？
              </h2>
            </div>
            {/* Contextual image */}
            <div className="sov-fade sov-s2 relative overflow-hidden group hidden lg:block">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqNKJ-IER__53jD-gh3ANUytx-viD1cGyFyGCTnyMZ7eCcHQBYBigkvUyeJtyWbvkoHkBrq-bujo_hLiBSK6kGNEz6I9jgL45Is3VeL4ltrcBkq6IviSJ-rNhY-TiMvFZPaHl44yfv86xfv-HwUl2_cTRqVbKF399kx0w1ubRy7skd4rvwOfcLF3QaRSutnMplsNI2cg-1ZtXLrMn0k0bXFCUe0e6YAzC52yRAShr6gMCT03omgNetjEeC2Qag6OlGNE51YR1sJJkX"
                alt="Stone garden — deliberate, structured serenity"
                className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                style={{ aspectRatio: '16/6', filter: 'brightness(0.55) contrast(1.2) saturate(0.5) hue-rotate(200deg)' }}
              />
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }}></div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, rgba(6,16,37,0.6) 0%, transparent 50%)' }}></div>
            </div>
          </div>

          {/* Type cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {types.items.map((item, idx) => (
              <div key={idx}
                className="sov-fade group relative p-10 transition-all duration-700"
                style={{
                  animationDelay: `${0.3 + idx * 0.18}s`,
                  background: 'rgba(13,31,58,0.6)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(30,51,88,0.8)',
                  borderTop: '2px solid rgba(212,175,55,0.6)',
                }}>
                {/* Hover gold shimmer top */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }}></div>
                <div className="flex items-start gap-4 mb-8">
                  <span className="material-symbols-outlined" style={{ color: '#d4af37', fontSize: '1.8rem', fontVariationSettings: "'wght' 100" }}>
                    {idx === 0 ? 'castle' : 'groups_2'}
                  </span>
                  <div>
                    <p className="font-label text-[8px] uppercase tracking-[0.4em] mb-1" style={{ color: 'rgba(212,175,55,0.45)' }}>
                      Format 0{idx + 1}
                    </p>
                    <h3 className="font-headline" style={{ fontWeight: 300, fontSize: '1.3rem', color: '#d4af37' }}>{item.title}</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans" style={{ color: '#8fa4c0', fontSize: '0.9rem', fontWeight: 300 }}>
                      <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: '#d4af37' }}></span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Highlight box */}
          <div className="sov-fade sov-s5 p-10 lg:p-14 text-center"
            style={{
              border: '1px solid rgba(212,175,55,0.2)',
              borderTop: '2px solid rgba(212,175,55,0.5)',
              background: 'rgba(13,31,58,0.4)',
            }}>
            {types.highlightBox.map((line, idx) => (
              <p key={idx} className="font-headline"
                style={{ fontWeight: idx === 0 ? 300 : 100, fontSize: idx === 0 ? '1.15rem' : '1rem', color: idx === 0 ? '#d4af37' : '#4a6090', lineHeight: 2 }}>
                {line}
              </p>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // zen
  return (
    <section className="py-36 relative overflow-hidden" style={{ background: '#edeee8' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-screen-xl mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Image side */}
          <div className="zen-fade zen-s2 relative">
            <img
              className="w-full object-cover"
              style={{ aspectRatio: '3/4', filter: 'grayscale(25%) brightness(1.04) contrast(1.03)' }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZLH3kGe0Tmt9-Oj29skWIBBWxHg75YIOtVuyin-gUDbMOyQqDa7Pkr5TvrV_8WZDNVvp8cgfkDbbwGt_dkCIfP3Y54xKFAEDz1qMZZHLCxvwZpz8ECwLqm28Y8X-U1X-orJEey96FHQQDacn6H4VH5dGS6XHR33BySDN5hEmPuQrA8fKozSc6jSLSbvIGuDlo3Lic5E18bh8wHHr2JHGzFp0uEksuRX0FRJqFVq5E-4jaL089TAyJz6cZVs8JVqaesGXDshrmE0-g"
              alt="Bonsai tree in minimalist room"
            />
            {/* 100 years overlay */}
            <div className="absolute -bottom-6 -right-6 p-10 hidden md:flex flex-col"
              style={{ background: 'rgba(119,90,25,0.88)', color: '#fff6ed' }}>
              <span className="font-headline leading-none" style={{ fontWeight: 100, fontSize: '4rem' }}>100</span>
              <span className="font-label text-[9px] tracking-[0.35em] uppercase mt-1">Years Perspective</span>
            </div>
          </div>

          {/* Text side */}
          <div className="flex flex-col gap-10">
            <div className="zen-fade zen-s1">
              <p className="font-label text-[9px] uppercase tracking-[0.4em] mb-4" style={{ color: 'rgba(119,90,25,0.45)' }}>
                Family Office Types
              </p>
              <h2 className="font-headline leading-relaxed" style={{ fontWeight: 200, fontSize: 'clamp(1.5rem,3vw,2.2rem)', color: '#2f342e', letterSpacing: '-0.01em' }}>
                ファミリーオフィスとは？<br />
                <span style={{ fontWeight: 400, fontSize: '0.6em', color: '#5c605a' }}>プライベートバンクとの違い</span>
              </h2>
            </div>

            {types.items.map((item, idx) => (
              <div key={idx} className="zen-fade pb-8" style={{ animationDelay: `${0.3 + idx * 0.18}s`, borderBottom: '1px solid rgba(175,179,172,0.25)' }}>
                <p className="font-label text-[9px] uppercase tracking-[0.35em] mb-3" style={{ color: '#775a19' }}>{item.title}</p>
                <ul className="space-y-2">
                  {item.bullets.map((bullet, i) => (
                    <p key={i} className="font-body leading-loose" style={{ fontWeight: 300, color: '#5c605a', fontSize: '0.9rem' }}>{bullet}</p>
                  ))}
                </ul>
              </div>
            ))}

            <div className="zen-fade zen-s5 p-8" style={{ background: 'rgba(250,249,245,0.7)', borderLeft: '2px solid rgba(119,90,25,0.3)' }}>
              {types.highlightBox.map((line, idx) => (
                <p key={idx} className="font-headline leading-loose"
                  style={{ fontWeight: idx === 0 ? 600 : 300, fontSize: idx === 0 ? '1rem' : '0.9rem', color: idx === 0 ? '#2f342e' : '#5c605a' }}>
                  {line}
                </p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

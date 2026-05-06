import React from 'react';
import { siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';

export const NewsSection: React.FC = () => {
  const { theme } = useTheme();
  const { news } = siteContent.sections;

  if (theme === 'formal') {
    const imgs = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiQ3xEzlWT1zV6eptmpIXICi1Dwvvb3mUW2Dt0Nr5EifCcroJrD9JWZIfqBzA86SrYqFN9KKrC6Z0Xm1wkXGtBtmHpFySJNAA0uUp5SqINFKSKFRdh72SpAzYQs65m809iWUL0jMUZVo3o-yvZO4ovGHkLFcXUynNL53hGj7amw8IFblhH-KeXKDYmDQThQMLWxYn5Ojb8dasuHUN0uSn_2pWnmdID-wDK-6gB6zFD9mt4cEUmSL1HicmdQHfXbHZCCJAVT7TiP1bV",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgyRIAX_MWRSfr9AVUwxrklZMvfwUwztHRWkYKq4PfFASvQAAQ_hOKzcK4TZKQQ_8B-FxJjld9fpuVTSaB9-Kd-ls_tEVZUnBsgjjTHOtwDcuc5X5wtf3KwQ3WQQ9gUKcoYdXfvnWTspEdVJ0hOz9bm0tJS164OBDxmC-A-b_7Cqtq6_TLkFXscCs_A2XzFWEZ1998IbyVgTIV05uUbJ7UbQddx_CUt4Aq1NU0d6aGWMScOZUGecN-haGveKJbMZJtjiPH86yLzrsc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ6dlGPB1oA36hsiQnw7Ms_Enn_dZvJuIk3tHbxVuXGycCJfhe5NmjawVTfQ9rh3TRQ6nLXr1aNJtTP4_pz-oOk5uytjqy3h-Qm2QDhF67QV5tN6AAtsSokeR0rHQ1Wcg63-ha0kfn97wWl9VtmdHhpCqSinAKZ8VTZYa67rAdxHxxR7tUaJqFXMK9eka4srR2NrsXCtX3o7ZCw8Eh4A87CDZ2nGI4qpl4znayH6kUM78hvp95mfRrIJQTDXPPKai2y_lLPet4vvlf"
    ];
    return (
      <section className="py-28 relative overflow-hidden" style={{ background: '#f0ebe2' }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="form-fade form-s1 flex justify-between items-end mb-16">
            <div>
              <p className="font-label text-[9px] uppercase tracking-[0.35em] mb-3" style={{ color: '#9a8c6e' }}>Journal &amp; Regulatory Updates</p>
              <h2 className="font-headline" style={{ fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: '#00113a', letterSpacing: '-0.02em' }}>
                Institutional Insights
              </h2>
            </div>
            <button className="font-label text-[11px] uppercase tracking-widest flex items-center gap-2 transition-opacity hover:opacity-60"
              style={{ color: '#735c00' }}>
              {news.buttonText}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {news.items.map((item, idx) => (
              <article key={idx} className="form-fade group" style={{ animationDelay: `${0.2 + idx * 0.15}s` }}>
                <div className="overflow-hidden mb-6" style={{ aspectRatio: '16/10' }}>
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: 'brightness(0.96) contrast(1.04)' }}
                    src={imgs[idx]}
                    alt={item.text}
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <time className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: '#735c00' }}>{item.date}</time>
                  <span className="font-label text-[9px] tracking-widest uppercase px-2 py-0.5"
                    style={{ border: '1px solid rgba(0,17,58,0.12)', color: '#7a7060' }}>{item.tag}</span>
                </div>
                <h3 className="font-headline mb-3 transition-colors duration-300 group-hover:text-[#735c00]"
                  style={{ fontWeight: 800, fontSize: '1.05rem', color: '#00113a', lineHeight: 1.5, letterSpacing: '-0.01em' }}>
                  {item.text}
                </h3>
                <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-[1px] w-6" style={{ background: '#cca830' }}></div>
                  <span className="font-label text-[9px] tracking-widest uppercase" style={{ color: '#735c00' }}>Read More</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (theme === 'luxurious') {
    return (
      <section className="py-32 relative" style={{ background: '#0e0e0e' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(233,193,118,0.04) 0%, transparent 55%)'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">

            <div className="w-full md:w-1/4 md:sticky md:top-32 self-start">
              <div className="w-8 h-[1px] mb-6" style={{ background: '#e9c176' }}></div>
              <h2 className="font-headline mb-3" style={{ fontWeight: 200, fontSize: '1.4rem', color: '#c5a059', letterSpacing: '0.05em' }}>
                News &amp;<br />Intelligence
              </h2>
              <p className="font-label text-[9px] tracking-[0.4em] uppercase" style={{ color: '#4e4639' }}>Latest Updates</p>
            </div>

            <div className="w-full md:w-3/4 space-y-0 divide-y" style={{ borderColor: 'rgba(78,70,57,0.3)' }}>
              {news.items.map((item, idx) => (
                <div key={idx} className="lux-fade group cursor-pointer py-10 transition-all duration-500"
                  style={{ animationDelay: `${0.1 + idx * 0.15}s` }}>
                  <div className="flex items-center gap-6 mb-5">
                    <span className="font-label text-[10px] tracking-[0.3em]" style={{ color: '#e9c176' }}>{item.date}</span>
                    <span className="font-label text-[9px] tracking-widest uppercase px-3 py-1"
                      style={{ border: '1px solid rgba(78,70,57,0.5)', color: '#6b6050' }}>{item.tag}</span>
                  </div>
                  <h3 className="font-headline mb-4 transition-colors duration-300 group-hover:text-[#e9c176]"
                    style={{ fontWeight: 300, fontSize: '1.15rem', color: '#d1c5b4', lineHeight: 1.6 }}>
                    {item.text}
                  </h3>
                  <div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-[1px] w-8" style={{ background: '#e9c176' }}></div>
                    <span className="font-label text-[10px] tracking-widest uppercase" style={{ color: '#e9c176' }}>Read More</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (theme === 'pavilion') {
    const imgs = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiQ3xEzlWT1zV6eptmpIXICi1Dwvvb3mUW2Dt0Nr5EifCcroJrD9JWZIfqBzA86SrYqFN9KKrC6Z0Xm1wkXGtBtmHpFySJNAA0uUp5SqINFKSKFRdh72SpAzYQs65m809iWUL0jMUZVo3o-yvZO4ovGHkLFcXUynNL53hGj7amw8IFblhH-KeXKDYmDQThQMLWxYn5Ojb8dasuHUN0uSn_2pWnmdID-wDK-6gB6zFD9mt4cEUmSL1HicmdQHfXbHZCCJAVT7TiP1bV",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgyRIAX_MWRSfr9AVUwxrklZMvfwUwztHRWkYKq4PfFASvQAAQ_hOKzcK4TZKQQ_8B-FxJjld9fpuVTSaB9-Kd-ls_tEVZUnBsgjjTHOtwDcuc5X5wtf3KwQ3WQQ9gUKcoYdXfvnWTspEdVJ0hOz9bm0tJS164OBDxmC-A-b_7Cqtq6_TLkFXscCs_A2XzFWEZ1998IbyVgTIV05uUbJ7UbQddx_CUt4Aq1NU0d6aGWMScOZUGecN-haGveKJbMZJtjiPH86yLzrsc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ6dlGPB1oA36hsiQnw7Ms_Enn_dZvJuIk3tHbxVuXGycCJfhe5NmjawVTfQ9rh3TRQ6nLXr1aNJtTP4_pz-oOk5uytjqy3h-Qm2QDhF67QV5tN6AAtsSokeR0rHQ1Wcg63-ha0kfn97wWl9VtmdHhpCqSinAKZ8VTZYa67rAdxHxxR7tUaJqFXMK9eka4srR2NrsXCtX3o7ZCw8Eh4A87CDZ2nGI4qpl4znayH6kUM78hvp95mfRrIJQTDXPPKai2y_lLPet4vvlf"
    ];
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#0d0907' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(196,134,42,0.05) 0%, transparent 60%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="pav-fade pav-s1 flex justify-between items-end mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-1 rotate-45" style={{ background: '#c4862a', opacity: 0.55 }}></div>
                <p className="font-label text-[9px] uppercase tracking-[0.45em]" style={{ color: 'rgba(196,134,42,0.45)' }}>
                  Journal &amp; Intelligence
                </p>
              </div>
              <h2 className="font-headline" style={{ fontWeight: 100, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#f0e8d8', letterSpacing: '-0.02em' }}>
                Heritage Insights
              </h2>
            </div>
            <button className="font-label text-[10px] uppercase tracking-widest flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{ color: 'rgba(196,134,42,0.55)' }}>
              {news.buttonText}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Amber geometric rule */}
          <div className="flex items-center gap-3 mb-12">
            <div className="h-[1px] flex-grow" style={{ background: 'linear-gradient(90deg, #c4862a, rgba(196,134,42,0.1), transparent)' }}></div>
            <div className="w-1 h-1 rotate-45 shrink-0" style={{ background: 'rgba(196,134,42,0.4)' }}></div>
          </div>

          {/* Featured layout — one large + two stacked */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Large featured card */}
            <article className="pav-fade md:col-span-2 group cursor-pointer relative overflow-hidden"
              style={{ animationDelay: '0.2s', background: 'rgba(24,16,8,0.6)', border: '1px solid rgba(90,64,48,0.4)' }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={imgs[0]}
                  alt={news.items[0].text}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{ filter: 'brightness(0.55) contrast(1.1) sepia(30%) saturate(0.9)' }}
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(13,9,7,0.9) 0%, transparent 55%)' }}></div>
                <div className="absolute top-3 left-3 w-6 h-6"
                  style={{ borderTop: '1px solid rgba(196,134,42,0.35)', borderLeft: '1px solid rgba(196,134,42,0.35)' }}></div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <time className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(196,134,42,0.65)' }}>{news.items[0].date}</time>
                  <span className="font-label text-[8px] tracking-widest uppercase px-2 py-0.5"
                    style={{ border: '1px solid rgba(196,134,42,0.2)', color: '#5a4030' }}>{news.items[0].tag}</span>
                </div>
                <h3 className="font-headline transition-colors duration-300 group-hover:text-[#c4862a]"
                  style={{ fontWeight: 300, fontSize: '1.15rem', color: '#d4c0a0', lineHeight: 1.6 }}>
                  {news.items[0].text}
                </h3>
              </div>
            </article>

            {/* Two stacked cards */}
            <div className="flex flex-col gap-6">
              {news.items.slice(1).map((item, idx) => (
                <article key={idx}
                  className="pav-fade group cursor-pointer flex-1 overflow-hidden"
                  style={{ animationDelay: `${0.35 + idx * 0.15}s`, background: 'rgba(24,16,8,0.6)', border: '1px solid rgba(90,64,48,0.4)' }}>
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/8' }}>
                    <img
                      src={imgs[idx + 1]}
                      alt={item.text}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      style={{ filter: 'brightness(0.5) contrast(1.1) sepia(30%) saturate(0.85)' }}
                    />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(13,9,7,0.85) 0%, transparent 55%)' }}></div>
                  </div>
                  <div className="p-5">
                    <time className="font-label text-[8px] tracking-[0.35em] uppercase block mb-2" style={{ color: 'rgba(196,134,42,0.55)' }}>{item.date}</time>
                    <h3 className="font-headline text-sm leading-snug transition-colors duration-300 group-hover:text-[#c4862a]"
                      style={{ fontWeight: 300, color: '#b0a080', lineHeight: 1.5 }}>
                      {item.text}
                    </h3>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (theme === 'sovereign') {
    const imgs = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiQ3xEzlWT1zV6eptmpIXICi1Dwvvb3mUW2Dt0Nr5EifCcroJrD9JWZIfqBzA86SrYqFN9KKrC6Z0Xm1wkXGtBtmHpFySJNAA0uUp5SqINFKSKFRdh72SpAzYQs65m809iWUL0jMUZVo3o-yvZO4ovGHkLFcXUynNL53hGj7amw8IFblhH-KeXKDYmDQThQMLWxYn5Ojb8dasuHUN0uSn_2pWnmdID-wDK-6gB6zFD9mt4cEUmSL1HicmdQHfXbHZCCJAVT7TiP1bV",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgyRIAX_MWRSfr9AVUwxrklZMvfwUwztHRWkYKq4PfFASvQAAQ_hOKzcK4TZKQQ_8B-FxJjld9fpuVTSaB9-Kd-ls_tEVZUnBsgjjTHOtwDcuc5X5wtf3KwQ3WQQ9gUKcoYdXfvnWTspEdVJ0hOz9bm0tJS164OBDxmC-A-b_7Cqtq6_TLkFXscCs_A2XzFWEZ1998IbyVgTIV05uUbJ7UbQddx_CUt4Aq1NU0d6aGWMScOZUGecN-haGveKJbMZJtjiPH86yLzrsc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ6dlGPB1oA36hsiQnw7Ms_Enn_dZvJuIk3tHbxVuXGycCJfhe5NmjawVTfQ9rh3TRQ6nLXr1aNJtTP4_pz-oOk5uytjqy3h-Qm2QDhF67QV5tN6AAtsSokeR0rHQ1Wcg63-ha0kfn97wWl9VtmdHhpCqSinAKZ8VTZYa67rAdxHxxR7tUaJqFXMK9eka4srR2NrsXCtX3o7ZCw8Eh4A87CDZ2nGI4qpl4znayH6kUM78hvp95mfRrIJQTDXPPKai2y_lLPet4vvlf"
    ];
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#040d1e' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 85% 15%, rgba(126,179,240,0.05) 0%, transparent 50%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="sov-fade sov-s1 flex justify-between items-end mb-16">
            <div>
              <p className="font-label text-[9px] uppercase tracking-[0.45em] mb-4" style={{ color: 'rgba(212,175,55,0.45)' }}>
                Journal &amp; Intelligence
              </p>
              <h2 className="font-headline" style={{ fontWeight: 100, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#f0ece6', letterSpacing: '-0.02em' }}>
                Royal Intelligence
              </h2>
            </div>
            <button className="font-label text-[10px] uppercase tracking-widest flex items-center gap-2 transition-opacity hover:opacity-60"
              style={{ color: 'rgba(212,175,55,0.6)' }}>
              {news.buttonText}
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Gold top rule */}
          <div className="h-[1px] mb-12" style={{ background: 'linear-gradient(90deg, #d4af37, rgba(212,175,55,0.2), transparent)' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.items.map((item, idx) => (
              <article key={idx} className="sov-fade group cursor-pointer" style={{ animationDelay: `${0.2 + idx * 0.15}s` }}>
                {/* Image */}
                <div className="overflow-hidden mb-6 relative" style={{ aspectRatio: '16/10' }}>
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    src={imgs[idx]}
                    alt={item.text}
                    style={{ filter: 'brightness(0.55) contrast(1.2) saturate(0.5) hue-rotate(200deg)' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,13,30,0.7) 0%, transparent 60%)' }}></div>
                  {/* Gold top accent on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)' }}></div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <time className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: '#d4af37', opacity: 0.7 }}>{item.date}</time>
                  <span className="font-label text-[8px] tracking-widest uppercase px-2 py-0.5"
                    style={{ border: '1px solid rgba(212,175,55,0.2)', color: '#4a6090' }}>{item.tag}</span>
                </div>
                <h3 className="font-headline mb-3 transition-colors duration-300 group-hover:text-[#d4af37]"
                  style={{ fontWeight: 300, fontSize: '1rem', color: '#c8d4e8', lineHeight: 1.6 }}>
                  {item.text}
                </h3>
                <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-[1px] w-6" style={{ background: '#d4af37' }}></div>
                  <span className="font-label text-[8px] tracking-widest uppercase" style={{ color: '#d4af37' }}>Read More</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // zen
  return (
    <section className="py-36 relative overflow-hidden" style={{ background: '#faf9f5' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.018]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }}></div>

      <div className="relative max-w-screen-xl mx-auto px-8 lg:px-12">
        <div className="zen-fade zen-s1 flex justify-between items-end mb-16">
          <div>
            <p className="font-label text-[9px] uppercase tracking-[0.4em] mb-3" style={{ color: 'rgba(119,90,25,0.45)' }}>Latest Updates</p>
            <h2 className="font-headline" style={{ fontWeight: 200, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#2f342e', letterSpacing: '-0.01em' }}>
              Journal
            </h2>
          </div>
          <button className="font-label text-[10px] tracking-widest uppercase transition-all duration-500 hover:opacity-70"
            style={{ color: '#afb3ac', borderBottom: '1px solid transparent' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = '#afb3ac'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'; }}>
            {news.buttonText}
          </button>
        </div>

        <div className="kintsugi-line mb-16" style={{ opacity: 0.2 }}></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-x" style={{ borderColor: 'rgba(175,179,172,0.2)' }}>
          {news.items.map((item, idx) => (
            <article key={idx} className="zen-fade flex flex-col gap-6 group cursor-pointer px-8 first:pl-0 last:pr-0"
              style={{ animationDelay: `${0.2 + idx * 0.18}s` }}>
              <time className="font-label text-[9px] tracking-[0.35em]" style={{ color: '#787c75' }}>{item.date}</time>
              <h3 className="font-headline leading-relaxed transition-colors duration-500 group-hover:text-[#775a19]"
                style={{ fontWeight: 300, fontSize: '1rem', color: '#2f342e', letterSpacing: '0.01em' }}>
                {item.text}
              </h3>
              <div className="h-[1px] w-8 transition-all duration-700 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, #775a19, transparent)' }}></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const { about } = siteContent.sections;

  if (theme === 'formal') {
    return (
      <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: '#ece7de' }}>
        {/* Noise texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}></div>
        {/* Navy glow right */}
        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 90% 40%, rgba(0,17,58,0.04) 0%, transparent 60%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 items-start">

            {/* Sticky left col */}
            <div className="lg:w-5/12 lg:sticky lg:top-32">
              <p className="form-fade form-s1 font-label text-[10px] uppercase tracking-[0.35em] mb-5" style={{ color: '#9a8c6e' }}>
                {about.subTitle}
              </p>
              <h2 className="form-fade form-s2 font-headline mb-6"
                style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', color: '#00113a', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                {about.title}
              </h2>
              <div className="form-fade form-s2 h-[3px] w-16 mb-8" style={{ background: 'linear-gradient(90deg, #cca830, transparent)' }}></div>

              <p className="form-fade form-s3 font-sans leading-loose mb-8" style={{ color: '#5a5448', fontWeight: 300 }}>
                {about.paragraphs[0]}
              </p>

              <div className="form-fade form-s4 p-6" style={{ border: '1px solid rgba(204,168,48,0.25)', background: 'rgba(247,243,236,0.6)' }}>
                <span className="material-symbols-outlined mb-4 block" style={{ color: '#735c00', fontSize: '2rem' }}>verified_user</span>
                <p className="font-label text-sm font-bold mb-2" style={{ color: '#00113a' }}>完全紹介制の厳格なプライバシー</p>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#5a5448', fontWeight: 300 }}>
                  当オフィスは既存クライアントまたは提携先からのご紹介がない限り、ご入会を承っておりません。
                </p>
              </div>
            </div>

            {/* Right col */}
            <div className="lg:w-7/12">
              <p className="form-fade form-s3 font-sans leading-loose mb-10" style={{ color: '#5a5448', fontWeight: 300, fontSize: '1.05rem' }}>
                {about.paragraphs[1]}
              </p>

              {/* Contextual image — stone garden representing patient, long-term stewardship */}
              <div className="form-fade form-s3 relative overflow-hidden mb-10 group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqNKJ-IER__53jD-gh3ANUytx-viD1cGyFyGCTnyMZ7eCcHQBYBigkvUyeJtyWbvkoHkBrq-bujo_hLiBSK6kGNEz6I9jgL45Is3VeL4ltrcBkq6IviSJ-rNhY-TiMvFZPaHl44yfv86xfv-HwUl2_cTRqVbKF399kx0w1ubRy7skd4rvwOfcLF3QaRSutnMplsNI2cg-1ZtXLrMn0k0bXFCUe0e6YAzC52yRAShr6gMCT03omgNetjEeC2Qag6OlGNE51YR1sJJkX"
                  alt="Japanese stone garden — patience and long-term perspective"
                  className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                  style={{ aspectRatio: '16/7', filter: 'brightness(0.95) contrast(1.05) sepia(10%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center gap-3"
                  style={{ background: 'linear-gradient(to top, rgba(0,17,58,0.5) 0%, transparent 100%)' }}>
                  <div className="w-4 h-[1px]" style={{ background: '#cca830' }}></div>
                  <span className="font-label text-[8px] uppercase tracking-[0.35em]" style={{ color: 'rgba(240,235,226,0.7)' }}>
                    枯山水 · The art of patient cultivation
                  </span>
                </div>
              </div>

              <div className="form-fade form-s4 p-10 lg:p-14" style={{ background: '#00113a' }}>
                <h4 className="font-headline flex items-center gap-4 mb-10"
                  style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f0ebe2' }}>
                  <span className="w-8 h-[1px]" style={{ background: '#cca830' }}></span>
                  {about.title}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {[
                    { label: 'Independence', text: '外部の利害関係に左右されない独立したアドバイスを提供します。' },
                    { label: 'Holistic View', text: '金融資産だけでなく、一族全体の課題を包括的に管理します。' },
                    { label: 'Legacy', text: '次世代への価値観継承と、持続可能な資産保全を実現します。' },
                  ].map((item, i) => (
                    <div key={i}>
                      <p className="font-label text-[9px] uppercase tracking-[0.35em] mb-3" style={{ color: '#cca830' }}>{item.label}</p>
                      <p className="font-sans text-sm leading-loose" style={{ color: 'rgba(240,235,226,0.7)', fontWeight: 300 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative watermark */}
              <div className="hidden lg:block mt-8 text-right select-none" style={{ fontFamily: 'Noto Serif JP', fontWeight: 100, fontSize: '5rem', color: 'rgba(0,17,58,0.05)', lineHeight: 1, letterSpacing: '0.05em' }}>
                Heritage
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
          background: 'radial-gradient(ellipse at 80% 50%, rgba(233,193,118,0.05) 0%, transparent 60%)'
        }}></div>

        <div className="relative max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
            style={{ borderLeft: '1px solid rgba(233,193,118,0.15)', paddingLeft: '3rem' }}>

            {/* Text */}
            <div>
              <p className="font-label text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: '#4e4639' }}>
                {about.subTitle}
              </p>
              <h2 className="font-headline mb-10" style={{ fontWeight: 200, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#e5e2e1', letterSpacing: '-0.01em' }}>
                {about.title}
              </h2>
              <p className="font-sans font-light leading-loose mb-6" style={{ color: '#9a8f80', fontWeight: 300 }}>
                {about.paragraphs[0]}
              </p>
              <p className="font-sans font-light leading-loose" style={{ color: '#9a8f80', fontWeight: 300 }}>
                {about.paragraphs[1]}
              </p>
            </div>

            {/* Image — bonsai represents deliberate, generational cultivation */}
            <div className="lux-fade lux-s3 relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZLH3kGe0Tmt9-Oj29skWIBBWxHg75YIOtVuyin-gUDbMOyQqDa7Pkr5TvrV_8WZDNVvp8cgfkDbbwGt_dkCIfP3Y54xKFAEDz1qMZZHLCxvwZpz8ECwLqm28Y8X-U1X-orJEey96FHQQDacn6H4VH5dGS6XHR33BySDN5hEmPuQrA8fKozSc6jSLSbvIGuDlo3Lic5E18bh8wHHr2JHGzFp0uEksuRX0FRJqFVq5E-4jaL089TAyJz6cZVs8JVqaesGXDshrmE0-g"
                alt="Bonsai — generations of patient cultivation"
                className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                style={{ aspectRatio: '4/5', filter: 'grayscale(25%) brightness(0.7) contrast(1.15)' }}
              />
              {/* Gold shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: 'linear-gradient(135deg, rgba(233,193,118,0.07) 0%, transparent 60%)' }}></div>
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 100%)' }}>
                <span className="font-label text-[8px] uppercase tracking-[0.4em]" style={{ color: '#4e4639' }}>
                  百年の視点 · A Century of Perspective
                </span>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ borderColor: 'rgba(233,193,118,0.15)' }}></div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (theme === 'pavilion') {
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#0d0907' }}>
        {/* Radial amber warmth */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 55% 50% at 80% 50%, rgba(196,134,42,0.07) 0%, transparent 65%)'
        }}></div>
        {/* Geometric dot grid — subtle, inspired by the muqarnas pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(196,134,42,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center">

            {/* Image — stone garden with warm amber tint */}
            <div className="pav-fade pav-s2 relative overflow-hidden group order-2 lg:order-1">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqNKJ-IER__53jD-gh3ANUytx-viD1cGyFyGCTnyMZ7eCcHQBYBigkvUyeJtyWbvkoHkBrq-bujo_hLiBSK6kGNEz6I9jgL45Is3VeL4ltrcBkq6IviSJ-rNhY-TiMvFZPaHl44yfv86xfv-HwUl2_cTRqVbKF399kx0w1ubRy7skd4rvwOfcLF3QaRSutnMplsNI2cg-1ZtXLrMn0k0bXFCUe0e6YAzC52yRAShr6gMCT03omgNetjEeC2Qag6OlGNE51YR1sJJkX"
                alt="Stone garden — patient stewardship"
                className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                style={{ aspectRatio: '4/5', filter: 'brightness(0.6) contrast(1.1) saturate(0.8) sepia(30%)' }}
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(13,9,7,0.5) 0%, transparent 60%)' }}></div>
              {/* Geometric corner brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 pointer-events-none"
                style={{ borderTop: '1px solid rgba(196,134,42,0.45)', borderLeft: '1px solid rgba(196,134,42,0.45)' }}></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 pointer-events-none"
                style={{ borderBottom: '1px solid rgba(196,134,42,0.45)', borderRight: '1px solid rgba(196,134,42,0.45)' }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-5"
                style={{ background: 'linear-gradient(to top, rgba(13,9,7,0.9) 0%, transparent 100%)' }}>
                <p className="font-label text-[8px] uppercase tracking-[0.4em]" style={{ color: 'rgba(196,134,42,0.5)' }}>
                  百年の視点 · A Century of Perspective
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-1 rotate-45" style={{ background: '#c4862a' }}></div>
                <p className="pav-fade pav-s1 font-label text-[10px] uppercase tracking-[0.45em]" style={{ color: 'rgba(196,134,42,0.5)' }}>
                  {about.subTitle}
                </p>
              </div>
              <h2 className="pav-fade pav-s2 font-headline mb-3"
                style={{ fontWeight: 100, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#f0e8d8', letterSpacing: '-0.02em' }}>
                {about.title}
              </h2>
              {/* Amber diamond rule */}
              <div className="pav-fade pav-s2 flex items-center gap-3 mb-10">
                <div className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, #c4862a, transparent)' }}></div>
                <div className="w-1 h-1 rotate-45 shrink-0" style={{ background: 'rgba(196,134,42,0.5)' }}></div>
              </div>
              <p className="pav-fade pav-s3 font-sans font-light leading-loose mb-6" style={{ color: '#9a8878', fontWeight: 300 }}>
                {about.paragraphs[0]}
              </p>
              <p className="pav-fade pav-s4 font-sans font-light leading-loose mb-10" style={{ color: '#9a8878', fontWeight: 300 }}>
                {about.paragraphs[1]}
              </p>

              {/* Three pillars with geometric accents */}
              <div className="pav-fade pav-s5 grid grid-cols-3 gap-6 pt-8"
                style={{ borderTop: '1px solid rgba(196,134,42,0.12)' }}>
                {[
                  { label: 'Independence', jp: '独立性' },
                  { label: 'Holistic', jp: '包括性' },
                  { label: 'Legacy', jp: '継承性' },
                ].map((item, i) => (
                  <div key={i} className="relative pl-4"
                    style={{ borderLeft: '1px solid rgba(196,134,42,0.2)' }}>
                    <p className="font-headline mb-1" style={{ fontWeight: 700, fontSize: '0.95rem', color: '#c4862a' }}>{item.jp}</p>
                    <p className="font-label text-[8px] uppercase tracking-[0.3em]" style={{ color: '#5a4030' }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (theme === 'sovereign') {
    return (
      <section className="py-32 relative overflow-hidden" style={{ background: '#061025' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 90% 40%, rgba(212,175,55,0.06) 0%, transparent 55%)'
        }}></div>
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center">

            {/* Text */}
            <div style={{ borderLeft: '1px solid rgba(212,175,55,0.18)', paddingLeft: '2.5rem' }}>
              <p className="sov-fade sov-s1 font-label text-[10px] uppercase tracking-[0.45em] mb-6" style={{ color: 'rgba(212,175,55,0.5)' }}>
                {about.subTitle}
              </p>
              <h2 className="sov-fade sov-s2 font-headline mb-4"
                style={{ fontWeight: 100, fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#f0ece6', letterSpacing: '-0.02em' }}>
                {about.title}
              </h2>
              <div className="sov-fade sov-s2 h-[1px] w-24 mb-10"
                style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }}></div>
              <p className="sov-fade sov-s3 font-sans font-light leading-loose mb-6" style={{ color: '#8fa4c0', fontWeight: 300 }}>
                {about.paragraphs[0]}
              </p>
              <p className="sov-fade sov-s4 font-sans font-light leading-loose mb-10" style={{ color: '#8fa4c0', fontWeight: 300 }}>
                {about.paragraphs[1]}
              </p>

              {/* Three pillars */}
              <div className="sov-fade sov-s5 grid grid-cols-3 gap-6 pt-8"
                style={{ borderTop: '1px solid rgba(212,175,55,0.12)' }}>
                {[
                  { label: 'Independence', jp: '独立性' },
                  { label: 'Holistic', jp: '包括性' },
                  { label: 'Legacy', jp: '継承性' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-headline mb-1" style={{ fontWeight: 700, fontSize: '1rem', color: '#d4af37' }}>{item.jp}</p>
                    <p className="font-label text-[8px] uppercase tracking-[0.3em]" style={{ color: '#4a6090' }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="sov-fade sov-s3 relative overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZLH3kGe0Tmt9-Oj29skWIBBWxHg75YIOtVuyin-gUDbMOyQqDa7Pkr5TvrV_8WZDNVvp8cgfkDbbwGt_dkCIfP3Y54xKFAEDz1qMZZHLCxvwZpz8ECwLqm28Y8X-U1X-orJEey96FHQQDacn6H4VH5dGS6XHR33BySDN5hEmPuQrA8fKozSc6jSLSbvIGuDlo3Lic5E18bh8wHHr2JHGzFp0uEksuRX0FRJqFVq5E-4jaL089TAyJz6cZVs8JVqaesGXDshrmE0-g"
                alt="Bonsai — patient cultivation across generations"
                className="w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                style={{ aspectRatio: '4/5', filter: 'brightness(0.65) contrast(1.15) saturate(0.7) hue-rotate(190deg)' }}
              />
              {/* Navy-to-gold gradient overlay */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(4,13,30,0.5) 0%, transparent 60%)' }}></div>
              {/* Gold border frame */}
              <div className="absolute inset-0 border opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ borderColor: 'rgba(212,175,55,0.2)' }}></div>
              {/* Top rule */}
              <div className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, #d4af37, rgba(212,175,55,0.3), transparent)' }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(to top, rgba(4,13,30,0.9) 0%, transparent 100%)' }}>
                <p className="font-label text-[8px] uppercase tracking-[0.45em]" style={{ color: 'rgba(212,175,55,0.5)' }}>
                  百年の視点 · A Century of Perspective
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // zen
  return (
    <section className="py-36 relative overflow-hidden" style={{ background: '#f4f4ef' }}>
      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }}></div>
      {/* Gold warmth bottom-left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none" style={{
        background: 'radial-gradient(ellipse, rgba(119,90,25,0.05) 0%, transparent 70%)'
      }}></div>

      <div className="relative max-w-screen-xl mx-auto px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">

        <div className="md:col-span-7">
          <p className="zen-fade zen-s1 font-label text-[9px] uppercase tracking-[0.4em] mb-6" style={{ color: 'rgba(119,90,25,0.5)' }}>
            {about.subTitle}
          </p>
          <h2 className="zen-fade zen-s2 font-headline mb-10 leading-[1.2]"
            style={{ fontWeight: 200, fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', color: '#2f342e', letterSpacing: '-0.01em' }}>
            静寂の中に、<br />確かな繁栄を。
          </h2>
          <div className="zen-fade zen-s2 kintsugi-line mb-10" style={{ opacity: 0.25 }}></div>

          <p className="zen-fade zen-s3 font-body leading-loose mb-6 max-w-xl"
            style={{ fontWeight: 300, color: '#5c605a', fontSize: '1.02rem' }}>
            {about.paragraphs[0]}
          </p>
          <p className="zen-fade zen-s4 font-body leading-loose"
            style={{ fontWeight: 300, color: '#5c605a' }}>
            {about.paragraphs[1]}
          </p>

          <div className="zen-fade zen-s5 mt-12">
            <a href="#" className="font-label text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 transition-all duration-500 hover:gap-5"
              style={{ color: '#775a19' }}>
              <span className="kintsugi-line" style={{ maxWidth: '2rem', opacity: 0.6 }}></span>
              {about.buttonText}
            </a>
          </div>
        </div>

        <div className="zen-fade zen-s3 md:col-span-5 flex justify-end items-start pt-8 md:pt-20">
          <div className="w-full" style={{ padding: '1.5rem', background: '#edeee8' }}>
            <img
              className="w-full mb-6 object-cover"
              style={{ aspectRatio: '4/5', filter: 'grayscale(30%) brightness(1.05) contrast(1.02)' }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWsgkQ-8fVt3mUEZCjvGkj-lVEB1XvSezhJUs3TcTOeUoMZf7Ck8x4t7PfZTmdAPm1uyqDYeV91zhfZv5Z5GUYNlrW9RkgYYyhbn7sr8kx4midHDRKs5wkivofF9jc3LwtPoZC3RcMY3MxG57xtEqmR1jDixhPXclwczSnBMxGWaNzAHlPhgdX7qsyImXJ7fQ4OBR5Ybo82xalNsZEMfsBYbe5mSwLwcXPcGnQOTYGcGnwEIgzWyaZ4jvSrwF5mxPfqOo4XqlDcNvM"
              alt="Japanese washi paper texture"
            />
            <div className="kintsugi-line mb-4" style={{ opacity: 0.2 }}></div>
            <p className="font-headline text-[10px] tracking-widest leading-loose" style={{ color: '#787c75', fontWeight: 300 }}>
              喧騒から離れた、一族だけの静かなる決断の場所。
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

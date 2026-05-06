import React from 'react';
import { siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import jwd2 from '../publicjwd2-topaz-enhance.png';
import jwd1 from '../publicjwd1-topaz-enhance.png';

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const { companyName } = siteContent.global;

  if (theme === 'formal') {
    return (
      <section className="relative overflow-hidden min-h-[92vh] flex items-center" style={{ background: '#f0ebe2' }}>

        {/* Noise texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}></div>

        {/* Radial navy glow top-right */}
        <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 80% 30%, rgba(0,17,58,0.05) 0%, transparent 65%)'
        }}></div>
        {/* Gold accent bottom-left */}
        <div className="absolute bottom-0 left-0 w-72 h-72 pointer-events-none" style={{
          background: 'radial-gradient(ellipse, rgba(204,168,48,0.08) 0%, transparent 70%)'
        }}></div>

        <div className="relative w-full max-w-screen-2xl mx-auto px-8 lg:px-12 pt-32 pb-20">
          <div className="grid grid-cols-12 gap-0 items-center">

            {/* Left content */}
            <div className="col-span-12 lg:col-span-6 pb-16 lg:pb-0 lg:pr-16">

              <div className="form-fade form-s1 flex items-center gap-4 mb-8">
                <span className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, #cca830, transparent)' }}></span>
                <span className="font-label text-[10px] uppercase tracking-[0.3em]" style={{ color: '#735c00' }}>First Call Partner</span>
              </div>

              <h1 className="form-fade form-s2 font-headline text-[#00113a] mb-8"
                style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                100年先を見つめる、<br />
                <span style={{ fontWeight: 300, color: '#1a2d5a' }}>一族の資産保全。</span>
              </h1>

              <p className="form-fade form-s3 font-sans leading-loose max-w-lg mb-10"
                style={{ color: '#5a5448', fontWeight: 300, fontSize: '1.05rem' }}>
                {companyName}は、日本の伝統的な富の継承と、グローバルな資産運用の知見を融合。永続的な繁栄を目指す一族の羅針盤として、究極のパーソナル・サービスを提供いたします。
              </p>

              <div className="form-fade form-s4 flex items-center gap-6">
                <button className="font-label text-xs tracking-[0.25em] uppercase px-8 py-4 transition-all duration-500"
                  style={{ background: '#00113a', color: '#f0ebe2' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a2d5a'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#00113a'; }}>
                  お問い合わせ
                </button>
                <div className="hidden lg:flex items-center gap-3">
                  <div className="h-[1px] w-8" style={{ background: '#cca830', opacity: 0.5 }}></div>
                  <span className="font-label text-[9px] tracking-[0.3em] uppercase" style={{ color: '#9a8c6e' }}>完全紹介制</span>
                </div>
              </div>

            </div>

            {/* Right image */}
            <div className="form-fade-left form-s3 col-span-12 lg:col-span-6 relative">
              <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqNKJ-IER__53jD-gh3ANUytx-viD1cGyFyGCTnyMZ7eCcHQBYBigkvUyeJtyWbvkoHkBrq-bujo_hLiBSK6kGNEz6I9jgL45Is3VeL4ltrcBkq6IviSJ-rNhY-TiMvFZPaHl44yfv86xfv-HwUl2_cTRqVbKF399kx0w1ubRy7skd4rvwOfcLF3QaRSutnMplsNI2cg-1ZtXLrMn0k0bXFCUe0e6YAzC52yRAShr6gMCT03omgNetjEeC2Qag6OlGNE51YR1sJJkX"
                  alt="Japanese stone garden"
                  style={{ filter: 'brightness(0.95) contrast(1.05)' }}
                />
                {/* Image tint overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,17,58,0.15) 100%)' }}></div>
              </div>

              {/* Overlay card */}
              <div className="form-fade form-s5 absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 p-8 lg:p-10 shadow-2xl max-w-[260px]"
                style={{ background: '#00113a' }}>
                <div className="w-8 h-[1px] mb-4" style={{ background: '#cca830' }}></div>
                <p className="font-headline mb-3 italic" style={{ fontWeight: 200, fontSize: '1.2rem', color: '#e8e3da' }}>Institutional Wisdom</p>
                <p className="font-label text-[9px] uppercase tracking-widest leading-loose" style={{ color: 'rgba(204,168,48,0.6)' }}>
                  Global governance for intergenerational wealth preservation.
                </p>
              </div>

              {/* Vertical side label */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 opacity-30">
                <div className="w-[1px] h-16" style={{ background: '#cca830' }}></div>
                <span className="font-label text-[8px] tracking-[0.5em] uppercase" style={{ writingMode: 'vertical-rl', color: '#00113a' }}>Heritage · Legacy</span>
                <div className="w-[1px] h-16" style={{ background: '#cca830' }}></div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  if (theme === 'luxurious') {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">

        {/* Background layers */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover object-center grayscale opacity-25"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1roq9jzq0EOiHfhFg8nPDbCN-wWZQhMT07h6sDdjd1ha9RHncGGJNmpz7mh35PzEmTnHO7ZEtxTYIbVaDiy8DXygztPg-w9vQ-9Ojrunti_4QbEWeY-GQP-Zf1MjId1_RRwqCOC7liYEd5NbU1fCX-nvm86kCRND5SpF6YfUwUyuEt9rS1IcLqtE966NTMxB8URmZnwe6-6w9DzCY12gFrmlsSNtgFbnsy-nKFTsh8K62P4ZlepGaiDmlwR30wCcaYlZe0Cl76R0k"
            alt="Luxury pen on black paper"
          />
        </div>

        {/* Mesh gradient atmosphere */}
        <div className="absolute inset-0 z-10" style={{
          background: `
            radial-gradient(ellipse at 10% 60%, rgba(233,193,118,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 20%, rgba(197,160,89,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(233,193,118,0.06) 0%, transparent 60%),
            linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,0.4) 100%)
          `
        }}></div>

        {/* Noise texture */}
        <div className="absolute inset-0 z-10 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}></div>

        {/* Grid lines */}
        <div className="absolute inset-0 z-10 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(rgba(233,193,118,1) 1px, transparent 1px), linear-gradient(90deg, rgba(233,193,118,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}></div>

        {/* Gold ambient glow */}
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse, rgba(233,193,118,0.08) 0%, transparent 70%)',
          animation: 'goldPulse 4s ease-in-out infinite'
        }}></div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-8 lg:px-12 w-full pt-32 pb-24">
          <div className="max-w-3xl flex flex-col gap-8">

            <div className="lux-fade lux-s1 flex items-center gap-4">
              <span className="w-16 h-[1px]" style={{ background: 'linear-gradient(90deg, #e9c176, transparent)' }}></span>
              <span className="text-[#e9c176] tracking-[0.4em] font-light text-[10px] uppercase font-label">Est. FOJ 2020</span>
            </div>

            <h1 className="lux-fade lux-s2 font-headline leading-[1.05] text-[#f0ece6]"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 200, letterSpacing: '-0.02em' }}>
              100年先を見つめる、<br />
              <span style={{ fontWeight: 700, color: '#e9c176' }}>一族の資産保全</span>
            </h1>

            <p className="lux-fade lux-s3 tracking-[0.6em] font-light text-sm uppercase font-label"
              style={{ color: '#c5a059' }}>
              First Call Partner
            </p>

            <p className="lux-fade lux-s4 font-sans font-light leading-loose max-w-lg"
              style={{ color: '#b0a090', fontWeight: 300, fontSize: '1rem' }}>
              私たちの役割は、単なる資産運用ではありません。代々受け継がれてきた精神と、未来への意志を繋ぐための「静かなる守護者」として、特別な一族のために最高峰のキュレーションを提供します。
            </p>

            <div className="lux-fade lux-s5 flex items-center gap-6 pt-4">
              <button
                className="font-label text-xs tracking-[0.25em] uppercase px-8 py-4 border transition-all duration-500 hover:bg-[#e9c176] hover:text-[#0a0a0a]"
                style={{ borderColor: '#e9c176', color: '#e9c176' }}>
                お問い合わせ
              </button>
              <div className="h-[1px] w-12" style={{ background: '#4e4639' }}></div>
              <span className="font-headline text-[10px] tracking-[0.3em] text-[#4e4639] uppercase">完全紹介制</span>
            </div>

          </div>
        </div>

        {/* Vertical side text */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-6 opacity-20">
          <div className="w-[1px] h-20 bg-[#e9c176]"></div>
          <span className="font-headline text-[9px] tracking-[0.5em] text-[#e9c176] uppercase"
            style={{ writingMode: 'vertical-rl' }}>Exclusivity · Stability · Heritage</span>
          <div className="w-[1px] h-20 bg-[#e9c176]"></div>
        </div>

      </section>
    );
  }

  if (theme === 'sovereign') {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#040d1e' }}>

        {/* ── Base image via CSS background — avoids React img-element reuse flash ── */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `url(${jwd2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          opacity: 0.72,
          filter: 'brightness(0.82) saturate(1.15) contrast(1.06)',
        }}></div>

        {/* ── Fog Layer 1 · Bottom bank (ground fog rising) ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'linear-gradient(to top, rgba(4,13,30,0.98) 0%, rgba(4,13,30,0.72) 14%, rgba(4,13,30,0.28) 28%, transparent 48%)',
          animation: 'fogDriftSlow 14s ease-in-out infinite',
        }}></div>

        {/* ── Fog Layer 2 · Top atmospheric haze ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(4,13,30,0.85) 0%, rgba(4,13,30,0.38) 14%, rgba(4,13,30,0.08) 32%, transparent 50%)',
          animation: 'fogDrift 18s ease-in-out infinite',
        }}></div>

        {/* ── Fog Layer 3 · Left reading veil (where text lives) ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'linear-gradient(to right, rgba(4,13,30,0.96) 0%, rgba(4,13,30,0.78) 22%, rgba(4,13,30,0.38) 46%, rgba(4,13,30,0.08) 68%, transparent 85%)',
        }}></div>

        {/* ── Fog Layer 4 · Perimeter vignette (edge depth) ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 72% 68% at 58% 52%, transparent 0%, transparent 35%, rgba(4,13,30,0.45) 65%, rgba(4,13,30,0.82) 100%)',
          animation: 'fogDriftSlow 22s ease-in-out infinite reverse',
        }}></div>

        {/* ── Fog Layer 5 · Gold warmth — mirrors the image's own gold glow ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 55% 45% at 62% 55%, rgba(212,175,55,0.13) 0%, transparent 65%),
            radial-gradient(ellipse 30% 30% at 38% 72%, rgba(212,155,30,0.08) 0%, transparent 60%)
          `,
          animation: 'fogDrift 26s ease-in-out infinite',
        }}></div>

        {/* ── Fog Layer 6 · Aquarium blue bloom — echoes the tank's own light ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 38% 40% at 64% 46%, rgba(40,110,210,0.10) 0%, transparent 70%)',
          animation: 'fogDriftSlow 20s ease-in-out infinite',
        }}></div>

        {/* ── Noise grain texture — adds cinematic film grain ── */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.035]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}></div>

        {/* ── Art deco grid — very faint structural geometry ── */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.028]" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}></div>

        {/* Geometric gold grid — art deco feel */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.035]" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}></div>

        {/* Gold ambient glow — centered low */}
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[250px] z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.12) 0%, transparent 70%)',
          animation: 'royalPulse 5s ease-in-out infinite'
        }}></div>

        {/* Content */}
        <div className="relative z-20 max-w-screen-2xl mx-auto px-8 lg:px-12 w-full pt-36 pb-28">
          <div className="max-w-3xl">

            <div className="sov-fade sov-s1 flex items-center gap-5 mb-10">
              <div className="h-[1px] w-20" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }}></div>
              <span className="font-label text-[10px] uppercase tracking-[0.45em]" style={{ color: 'rgba(212,175,55,0.6)' }}>
                Est. FOJ 2020
              </span>
            </div>

            <h1 className="sov-fade sov-s2 font-headline leading-[1.02] mb-6"
              style={{ fontSize: 'clamp(3rem,7.5vw,6rem)', fontWeight: 100, color: '#f0ece6', letterSpacing: '-0.02em' }}>
              100年先を見つめる、<br />
              <span style={{ fontWeight: 800, color: '#d4af37' }}>一族の資産保全</span>
            </h1>

            {/* Gold rule */}
            <div className="sov-fade sov-s3 h-[1px] w-32 mb-8" style={{ background: 'linear-gradient(90deg, #d4af37, transparent)' }}></div>

            <p className="sov-fade sov-s3 font-sans font-light leading-loose max-w-xl mb-10"
              style={{ color: '#8fa4c0', fontWeight: 300, fontSize: '1rem' }}>
              私たちの役割は、代々受け継がれてきた精神と未来への意志を繋ぐ「静かなる守護者」として、特別な一族のために最高峰のキュレーションを提供することです。
            </p>

            <div className="sov-fade sov-s4 flex items-center gap-6">
              <button
                className="font-label text-xs tracking-[0.25em] uppercase px-10 py-4 transition-all duration-500"
                style={{ background: 'linear-gradient(135deg, #d4af37, #b8940f)', color: '#040d1e', fontWeight: 700 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #f0d060, #d4af37)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #d4af37, #b8940f)'; }}>
                お問い合わせ
              </button>
              <div className="hidden md:flex items-center gap-3">
                <div className="h-[1px] w-10" style={{ background: 'rgba(212,175,55,0.3)' }}></div>
                <span className="font-label text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(212,175,55,0.4)' }}>完全紹介制</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right vertical accent lines — art deco geometry */}
        <div className="absolute right-12 top-0 bottom-0 z-20 hidden xl:flex flex-col items-center gap-0 pointer-events-none" style={{ width: '1px' }}>
          <div className="flex-1" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.25) 30%, rgba(212,175,55,0.25) 70%, transparent)' }}></div>
        </div>
        <div className="absolute right-20 top-1/2 -translate-y-1/2 z-20 hidden xl:block">
          <span className="font-headline text-[9px] tracking-[0.5em] uppercase"
            style={{ writingMode: 'vertical-rl', color: 'rgba(212,175,55,0.25)' }}>
            Sovereignty · Legacy · Excellence
          </span>
        </div>

      </section>
    );
  }

  if (theme === 'pavilion') {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#080604' }}>

        {/* ── Base image — geometric Islamic ceiling, CSS bg to avoid flash ── */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `url(${jwd1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          opacity: 0.45,
          filter: 'brightness(0.7) saturate(1.2) contrast(1.1)',
        }}></div>

        {/* ── Radial fog 1 · Center glow — traces the mandala's own amber light ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 55% at 60% 48%, rgba(196,134,42,0.12) 0%, transparent 70%)',
          animation: 'radialBreath 12s ease-in-out infinite',
        }}></div>

        {/* ── Radial fog 2 · Edge vignette — depth from periphery ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 75% at 50% 50%, transparent 0%, transparent 30%, rgba(8,6,4,0.55) 65%, rgba(8,6,4,0.92) 100%)',
          animation: 'radialBreath 18s ease-in-out infinite reverse',
        }}></div>

        {/* ── Directional fog · Left veil for text readability ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'linear-gradient(to right, rgba(8,6,4,0.97) 0%, rgba(8,6,4,0.82) 24%, rgba(8,6,4,0.42) 50%, rgba(8,6,4,0.10) 72%, transparent 88%)',
        }}></div>

        {/* ── Bottom fog bank ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'linear-gradient(to top, rgba(8,6,4,0.98) 0%, rgba(8,6,4,0.6) 12%, rgba(8,6,4,0.18) 26%, transparent 44%)',
          animation: 'fogDriftSlow 16s ease-in-out infinite',
        }}></div>

        {/* ── Top haze ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(8,6,4,0.88) 0%, rgba(8,6,4,0.35) 12%, transparent 32%)',
        }}></div>

        {/* ── Warm amber ambient bloom ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 40% 35% at 20% 60%, rgba(196,134,42,0.1) 0%, transparent 65%)',
          animation: 'amberGlow 14s ease-in-out infinite',
        }}></div>

        {/* ── Navy accent from image center ── */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 28% 28% at 62% 47%, rgba(26,37,96,0.18) 0%, transparent 60%)',
        }}></div>

        {/* ── Film grain ── */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}></div>

        {/* ── Content ── */}
        <div className="relative z-20 max-w-screen-2xl mx-auto px-8 lg:px-12 w-full pt-36 pb-28">
          <div className="max-w-2xl">

            <div className="pav-fade pav-s1 flex items-center gap-5 mb-10">
              <div className="h-[1px] w-16" style={{ background: 'linear-gradient(90deg, #c4862a, transparent)' }}></div>
              <span className="font-label text-[9px] uppercase tracking-[0.45em]" style={{ color: 'rgba(196,134,42,0.55)' }}>
                First Call Partner · Est. FOJ 2020
              </span>
            </div>

            <h1 className="pav-fade pav-s2 font-headline leading-[1.05] mb-4"
              style={{ fontSize: 'clamp(2.8rem,7vw,5.8rem)', fontWeight: 100, color: '#f0e8d8', letterSpacing: '-0.025em' }}>
              100年先を<br />見つめる、
            </h1>
            <h1 className="pav-fade pav-s3 font-headline leading-[1.05] mb-8"
              style={{ fontSize: 'clamp(2.8rem,7vw,5.8rem)', fontWeight: 800, color: '#c4862a', letterSpacing: '-0.025em', fontStyle: 'italic' }}>
              一族の資産保全。
            </h1>

            {/* Amber geometric rule */}
            <div className="pav-fade pav-s3 flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-grow max-w-[6rem]" style={{ background: 'linear-gradient(90deg, #c4862a, transparent)' }}></div>
              <div className="w-1.5 h-1.5 rotate-45" style={{ background: '#c4862a', opacity: 0.6 }}></div>
              <div className="h-[1px] flex-grow max-w-[6rem]" style={{ background: 'linear-gradient(90deg, transparent, #c4862a)' }}></div>
            </div>

            <p className="pav-fade pav-s4 font-sans font-light leading-loose max-w-lg mb-10"
              style={{ color: '#9a8878', fontWeight: 300, fontSize: '1rem' }}>
              私たちの役割は、代々受け継がれてきた精神と未来への意志を繋ぐ「静かなる守護者」として、特別な一族のために最高峰のキュレーションを提供することです。
            </p>

            <div className="pav-fade pav-s5 flex items-center gap-6">
              <button
                className="font-label text-xs tracking-[0.25em] uppercase px-10 py-4 transition-all duration-500"
                style={{ background: '#c4862a', color: '#080604', fontWeight: 700 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e8a835'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#c4862a'; }}>
                お問い合わせ
              </button>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(196,134,42,0.35)' }}></div>
                <span className="font-label text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(196,134,42,0.4)' }}>完全紹介制</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Vertical side label ── */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col items-center gap-5 opacity-20">
          <div className="w-[1px] h-16" style={{ background: 'linear-gradient(to bottom, transparent, #c4862a)' }}></div>
          <span className="font-headline text-[9px] tracking-[0.5em]"
            style={{ writingMode: 'vertical-rl', color: '#c4862a' }}>Heritage · Geometry · Eternity</span>
          <div className="w-[1px] h-16" style={{ background: 'linear-gradient(to top, transparent, #c4862a)' }}></div>
        </div>

      </section>
    );
  }

  // zen
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#faf9f5' }}>

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA80AIU9e41-2rcz8150Gqowwq015ZQLTT3EiLIqzOk4jXVbdmuLn90BKER8Dv_KADSPWoO6oCzAXuxBiIfeBpgGhvMPomMTe7k6_rTrgygFZLxNifXz_7RU8qV0KAFhZV8LvDi0Oj4eAKZqlPhndfgMrew_xLHS1yS8yLAEqWVA1wlomj3zUwrSV0jbFGyrIzHvs73R_fnpZegal-oB3Z0T8MBPL7gI3Tmd78y0GEYbwHG2bq-9PZc_La6jhoc2j_xl5put8_eHVit"
          alt="Minimalist Japanese architecture"
          style={{ opacity: 0.58, filter: 'contrast(1.04) saturate(0.85)' }}
        />
        {/* Light gradient veil — keeps text readable while image stays prominent */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(250,249,245,0.72) 0%, rgba(250,249,245,0.3) 55%, rgba(250,249,245,0.05) 100%)'
        }}></div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(250,249,245,0.3) 0%, transparent 30%, transparent 70%, rgba(250,249,245,0.6) 100%)'
        }}></div>
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.022]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }}></div>

      {/* Warm radial glow */}
      <div className="absolute bottom-0 right-0 w-[50%] h-[60%] pointer-events-none z-0" style={{
        background: 'radial-gradient(ellipse at 80% 80%, rgba(119,90,25,0.06) 0%, transparent 65%)'
      }}></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-8 lg:px-12 pt-32 pb-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-16">

          <div className="max-w-2xl">
            <div className="zen-fade zen-s1 flex items-center gap-4 mb-10">
              <div className="zen-line h-[1px] w-10 origin-left" style={{ background: '#775a19' }}></div>
              <span className="font-label text-[9px] uppercase tracking-[0.4em]" style={{ color: 'rgba(119,90,25,0.6)' }}>First Call Partner</span>
            </div>

            <h1 className="zen-fade zen-s2 font-headline leading-[1.08] mb-8" style={{
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              fontWeight: 200,
              color: '#2f342e',
              letterSpacing: '-0.02em'
            }}>
              100年先を見つめる、<br />
              <span style={{ fontWeight: 700, fontStyle: 'italic', color: '#775a19' }}>一族の資産保全。</span>
            </h1>

            <div className="zen-fade zen-s3 flex items-center gap-4">
              <div className="kintsugi-line" style={{ maxWidth: '8rem', opacity: 0.4 }}></div>
            </div>
          </div>

          <div className="zen-fade zen-s4 flex flex-col items-end gap-6 py-4"
            style={{ borderLeft: '1px solid rgba(119,90,25,0.15)', paddingLeft: '2.5rem' }}>
            <p className="font-headline text-sm leading-loose text-right"
              style={{ fontWeight: 300, color: '#5c605a', letterSpacing: '0.05em' }}>
              限られた一族のための<br />
              完全紹介制プライベート・オフィス
            </p>
            <span className="font-headline text-[10px] tracking-[0.35em] px-5 py-2"
              style={{ color: '#775a19', border: '1px solid rgba(119,90,25,0.25)', background: 'rgba(119,90,25,0.04)' }}>
              完全紹介制
            </span>
            <button className="font-label text-[10px] uppercase tracking-[0.25em] px-6 py-3 transition-all duration-700"
              style={{ background: '#775a19', color: '#fff6ed' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#5d4613'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#775a19'; }}>
              お問い合わせ
            </button>
          </div>

        </div>

        {/* Vertical side text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-5 opacity-15">
          <div className="w-[1px] h-16" style={{ background: '#775a19' }}></div>
          <span className="font-headline text-[8px] tracking-[0.5em]"
            style={{ writingMode: 'vertical-rl', color: '#775a19' }}>Harmony · Legacy · Continuity</span>
          <div className="w-[1px] h-16" style={{ background: '#775a19' }}></div>
        </div>
      </div>

    </section>
  );
};

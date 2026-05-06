import React from 'react';
import { siteContent } from '../data/content';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { companyName, copyright, address, navLinks } = siteContent.global;

  if (theme === 'formal') {
    return (
      <footer className="relative overflow-hidden" style={{ background: '#1a1208', borderTop: '1px solid rgba(204,168,48,0.15)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 30% 100%, rgba(204,168,48,0.06) 0%, transparent 55%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">

            <div>
              <span className="font-headline block mb-2"
                style={{ fontWeight: 800, fontSize: '1.25rem', color: '#f0ebe2', letterSpacing: '-0.01em' }}>
                {companyName}
              </span>
              <span className="font-label text-[9px] uppercase tracking-[0.35em] block mb-5" style={{ color: '#cca830', opacity: 0.6 }}>
                Institutional Heritage Since 2020
              </span>
              <p className="font-sans text-xs leading-loose" style={{ color: 'rgba(240,235,226,0.35)', fontWeight: 300, maxWidth: '22rem' }}>
                {address}
              </p>
            </div>

            <div className="flex flex-wrap gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`}
                  className="font-label text-[10px] uppercase tracking-widest transition-colors duration-300 hover:text-[#cca830]"
                  style={{ color: 'rgba(240,235,226,0.3)' }}>
                  {link}
                </a>
              ))}
            </div>

          </div>

          <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(204,168,48,0.1)' }}>
            <p className="font-label text-[9px] tracking-widest uppercase" style={{ color: 'rgba(240,235,226,0.2)' }}>{copyright}</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px]" style={{ background: 'rgba(204,168,48,0.2)' }}></div>
              <span className="font-headline text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(204,168,48,0.2)' }}>完全紹介制</span>
              <div className="w-6 h-[1px]" style={{ background: 'rgba(204,168,48,0.2)' }}></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (theme === 'luxurious') {
    return (
      <footer className="relative overflow-hidden" style={{ background: '#080808', borderTop: '1px solid rgba(78,70,57,0.4)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(233,193,118,0.04) 0%, transparent 60%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">

            <div>
              <span className="font-headline block mb-2" style={{ fontWeight: 200, fontSize: '1.3rem', color: '#e9c176', letterSpacing: '0.2em' }}>
                THE FAMILY OFFICE
              </span>
              <span className="font-label text-[9px] tracking-[0.4em] uppercase block mb-6" style={{ color: '#4e4639' }}>
                Japan · Est. 2020
              </span>
              <p className="font-sans text-xs leading-loose" style={{ color: '#4e4639', fontWeight: 300, maxWidth: '22rem' }}>{address}</p>
            </div>

            <div className="flex flex-wrap gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`}
                  className="font-label text-[10px] tracking-widest uppercase transition-colors duration-300 hover:text-[#c5a059]"
                  style={{ color: '#4e4639' }}>
                  {link}
                </a>
              ))}
            </div>

          </div>

          <div className="mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(78,70,57,0.3)' }}>
            <p className="font-label text-[9px] tracking-widest uppercase" style={{ color: '#2e2e2e' }}>{copyright}</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px]" style={{ background: 'rgba(233,193,118,0.2)' }}></div>
              <span className="font-headline text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(233,193,118,0.2)' }}>完全紹介制</span>
              <div className="w-6 h-[1px]" style={{ background: 'rgba(233,193,118,0.2)' }}></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (theme === 'pavilion') {
    return (
      <footer className="relative overflow-hidden" style={{ background: '#080604' }}>
        {/* Amber geometric top rule with diamonds */}
        <div className="absolute top-0 left-0 right-0 flex items-center" style={{ height: '1px' }}>
          <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,134,42,0.4))' }}></div>
          <div className="w-1 h-1 rotate-45 shrink-0 mx-2" style={{ background: 'rgba(196,134,42,0.4)' }}></div>
          <div className="flex-1 h-full" style={{ background: 'linear-gradient(90deg, rgba(196,134,42,0.4), transparent)' }}></div>
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(196,134,42,0.04) 0%, transparent 60%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <span className="font-headline block mb-2" style={{ fontWeight: 100, fontSize: '1.2rem', color: '#c4862a', letterSpacing: '0.2em' }}>
                THE FAMILY OFFICE
              </span>
              <span className="font-label text-[8px] uppercase tracking-[0.45em] block mb-6" style={{ color: 'rgba(196,134,42,0.3)' }}>
                Japan · Est. 2020
              </span>
              <p className="font-sans text-xs leading-loose" style={{ color: 'rgba(154,136,120,0.4)', fontWeight: 300, maxWidth: '22rem' }}>{address}</p>
            </div>
            <div className="flex flex-wrap gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`}
                  className="font-label text-[10px] tracking-widest uppercase transition-all duration-300"
                  style={{ color: '#2a1c0a' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#c4862a'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#2a1c0a'; }}>
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(196,134,42,0.07)' }}>
            <p className="font-label text-[9px] tracking-widest uppercase" style={{ color: 'rgba(90,64,48,0.5)' }}>{copyright}</p>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(196,134,42,0.2)' }}></div>
              <span className="font-label text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(196,134,42,0.2)' }}>完全紹介制</span>
              <div className="w-1 h-1 rotate-45" style={{ background: 'rgba(196,134,42,0.2)' }}></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (theme === 'sovereign') {
    return (
      <footer className="relative overflow-hidden" style={{ background: '#040d1e', borderTop: '1px solid rgba(212,175,55,0.15)' }}>
        {/* Top gold rule */}
        <div className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 30%, #f0d060 50%, #d4af37 70%, transparent 100%)' }}></div>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.05) 0%, transparent 55%)'
        }}></div>

        <div className="relative max-w-screen-2xl mx-auto px-8 lg:px-12 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">

            <div>
              <span className="font-headline block mb-2" style={{ fontWeight: 200, fontSize: '1.2rem', color: '#d4af37', letterSpacing: '0.22em' }}>
                THE FAMILY OFFICE
              </span>
              <span className="font-label text-[8px] uppercase tracking-[0.45em] block mb-6" style={{ color: 'rgba(212,175,55,0.3)' }}>
                Japan · Est. 2020
              </span>
              <p className="font-sans text-xs leading-loose" style={{ color: 'rgba(143,164,192,0.4)', fontWeight: 300, maxWidth: '22rem' }}>{address}</p>
            </div>

            <div className="flex flex-wrap gap-8 lg:gap-10">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`}
                  className="font-label text-[10px] tracking-widest uppercase transition-all duration-300"
                  style={{ color: '#1e3358' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#d4af37'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#1e3358'; }}>
                  {link}
                </a>
              ))}
            </div>

          </div>

          <div className="mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(212,175,55,0.08)' }}>
            <p className="font-label text-[9px] tracking-widest uppercase" style={{ color: 'rgba(74,96,144,0.5)' }}>{copyright}</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px]" style={{ background: 'rgba(212,175,55,0.2)' }}></div>
              <span className="font-label text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(212,175,55,0.2)' }}>完全紹介制</span>
              <div className="w-6 h-[1px]" style={{ background: 'rgba(212,175,55,0.2)' }}></div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // zen
  return (
    <footer className="bg-stone-950 border-t border-stone-800/30">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 lg:px-12 py-12 w-full max-w-screen-2xl mx-auto">
        <div className="flex flex-col gap-2 mb-8 md:mb-0">
          <span className="text-lg font-light text-[#775a19] font-headline tracking-[0.2em]">THE FAMILY OFFICE</span>
          <span className="font-headline text-[10px] tracking-widest text-stone-600 uppercase">{copyright}</span>
          <span className="text-xs text-stone-700 mt-1">{address}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-headline text-xs tracking-widest text-stone-600 hover:text-[#775a19] transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
